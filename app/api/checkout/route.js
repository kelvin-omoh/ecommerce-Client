import { NextRequest, NextResponse } from "next/server";
import Product from "../../models/Product";
import connectMongoDB from "@/app/lib/ConnectDb";
import { Order } from "@/app/models/Order";
import https from 'https'

export async function POST(req, res) {
    try {
        await connectMongoDB();

        const { name, email, city, postalCode, streetAddress, country, cartProducts } = await req.json();
        const productsIds = cartProducts;
        const uniqueIds = [...new Set(productsIds)];
        const productsInfos = await Product.find({ _id: uniqueIds });

        let line_items = [];
        let TotalAmount = 0;

        for (const productId of uniqueIds) {
            const productInfo = productsInfos.find(p => p._id.toString() === productId);
            const quantity = productsIds.filter(id => id === productId)?.length || 0;

            if (quantity > 0 && productInfo) {
                TotalAmount += quantity * productInfo.price * 100;
                line_items.push({
                    quantity,
                    price_data: {
                        currency: 'USD',
                        product_data: { name: productInfo.title },
                        unit_amount: quantity * productInfo.price * 10000,
                    },
                });
            }
        }

        const orderDoc = await Order.create({
            line_items, name, email, city, postalCode, streetAddress, country, paid: false,
        });
        console.log("order ID" + orderDoc._id);
        const params = JSON.stringify({
            "email": email,
            "amount": TotalAmount,
            "currency": "NGN",
            "metadata": {
                "order_id": orderDoc._id,
            }

        });



        const options = {
            hostname: 'api.paystack.co',
            port: 443,
            path: '/transaction/initialize',
            method: 'POST',
            headers: {
                "Authorization": `Bearer ${process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY.trim()}`,
                'Content-Type': 'application/json'
            },

        };

        let data = '';

        const reqs = await new Promise((resolve, reject) => {
            const req = https.request(options, response => {
                response.on('data', chunk => {
                    data += chunk;
                });

                response.on('end', () => {


                    console.log(data);
                    resolve(data);
                });
            });

            req.on('error', error => {
                reject(error);
            });

            req.write(params);
            req.end();
        });

        const responseData = JSON.parse(reqs);
        if (responseData) {


            console.log(responseData);
            return NextResponse.json(responseData);
        }




    } catch (error) {
        console.error(error);
        // Send appropriate response for error
        const errorResponse = new NextResponse("Internal Server Error", { status: 500 });
        return NextResponse.json(errorResponse);
    }
}
