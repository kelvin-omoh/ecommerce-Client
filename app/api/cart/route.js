import { NextRequest, NextResponse } from "next/server";
import Product from "../../models/Product";
import connectMongoDB from "@/app/lib/ConnectDb";



export async function POST(req, res) {
    try {

        await connectMongoDB();
        const { ids } = await req.json();
        console.log(ids);

        return NextResponse.json(await Product.find({ _id: ids }))

    }
    catch (e) {
        console.error(e);
        return new NextResponse("Internal Server Error", { status: 500 });
    }

}

