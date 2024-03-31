import { NextRequest, NextResponse } from "next/server";
import Product from "../../../models/Product";
import connectMongoDB from "@/app/lib/ConnectDb";

export async function GET(req, { params }) {
    try {
        await connectMongoDB();
        const id = params.id
        let productData;
        console.log(id);

        productData = await Product.findOne({ _id: id })
        return NextResponse.json(productData, { status: 201 })


    }
    catch (e) {
        console.error(e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }
}

