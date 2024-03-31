import { NextRequest, NextResponse } from "next/server";
import Product from "../../models/Product";
import connectMongoDB from "@/app/lib/ConnectDb";

export async function GET(req, res) {
    try {
        await connectMongoDB();

        // Extract the limit parameter from the request query
        const limit = parseInt(req.nextUrl?.searchParams.get('limit'));

        const id = req.nextUrl?.searchParams.get('id');
        let productData;

        if (id) {
            productData = await Product.findOne({ _id: id })
            return NextResponse.json(productData, { status: 201 })

        } else {
            // Find all products with the specified limit
            if (req.nextUrl?.searchParams.get('limit')) {
                const products = await Product.find({}, null, { sort: { '_id': -1 } }).limit(limit);
                return NextResponse.json(products);
            }
            else {
                const products = await Product.find({}, null, { sort: { '_id': -1 } });
                return NextResponse.json(products);
            }

        }
    }
    catch (e) {
        console.error(e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

