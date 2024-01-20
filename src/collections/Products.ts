
import { PRODUCT_CATEGORIES } from "../config";
import { CollectionConfig } from "payload/types";
import { Product } from "../payload-types";
import { BeforeChangeHook } from "payload/dist/collections/config/types";
import { stripe } from "../lib/stripe";

const addUser: BeforeChangeHook<Product> = async ({ req, data }) => {
    const user = req.user
    return { ...data, user: user }
}

export const Products: CollectionConfig = {
    slug: "products",
    admin: {
        useAsTitle: "name"
    },
    access: {},
    hooks: {
        beforeChange: [addUser, async (args) => {
            if (args.operation === "create") {
                const data = args.data as Product

                const createdProduct = await stripe.products.create({
                    name: data.name,
                    default_price_data: {
                        currency: "USD",
                        unit_amount: Math.round(data.price * 100),

                    }
                })
            } else if (args.operation === "update") {

            }
        }]
    },
    fields: [{
        name: "user",
        type: "relationship",
        relationTo: "users",
        required: true,
        hasMany: false,
        admin: {
            condition: () => false
        }
    }, {
        name: "name",
        label: "Name",
        type: "text",
        required: true
    }, {
        name: "description",
        label: "Product Details",
        type: "textarea"
    },
    {
        name: "price",
        label: "Price In USD",
        min: 0,
        max: 1000,
        type: "number",
        required: true
    },
    {
        name: "category",
        label: "Category",
        type: "select",
        options: PRODUCT_CATEGORIES.map(({ label, value }) => {
            return { label, value }
        }),
        required: true
    },
    {
        name: "product_files",
        label: "Products file(s)",
        type: "relationship",
        required: true,
        relationTo: "product_files",
        hasMany: false
    },
    {
        name: "approvedForSale",
        label: "Product Status",
        type: "select",
        access: {
            create: ({ req }) => req.user.role === "admin",
            update: ({ req }) => req.user.role === "admin",
            read: ({ req }) => req.user.role === "admin"
        },
        defaultValue: "pending",
        options: [{
            label: "Pendning verification",
            value: "pending"
        }, {
            label: "Approved",
            value: "approved"
        }, {
            label: "Denied",
            value: "denied"
        }
        ]
    }, {
        name: "priceId",
        access: {
            create: () => false,
            read: () => false,
            update: () => false
        },
        type: "text",
        admin: {
            hidden: true
        },
    },
    {
        name: "stripeId",
        access: {
            create: () => false,
            read: () => false,
            update: () => false
        },
        type: "text",
        admin: {
            hidden: true
        },
    },
    {
        name: "images",
        type: "array",
        label: "product images",
        minRows: 1,
        maxRows: 4,
        required: true,
        labels: {
            singular: "Image",
            plural: "Images"
        },
        fields: [
            {
                name: "image",
                type: "upload",
                relationTo: "media",
                required: true
            }
        ]

    }]
}