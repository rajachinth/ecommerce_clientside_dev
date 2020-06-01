export interface OrderModel {
    orderList: {
        id: string,
        orderDate: Date,
        customerDetails: {
            name: string,
            address: string,
            pincode: number,
            mobile: number,
        },
        cartDetails: {
            productItem: Array<any>,
            totalItemsCost: number,
            totalItemsCount: number
        }
    }[];
}
 /*const orderModel:OrderModel={
                    orderList:[{
                      id:value.DB_Populate.orderID,
                      orderDate:value.DB_Populate.orderDate,
                      customerDetails:{
                        name:value.DB_Populate.orderlist.shippingDetails.name,
                        address:value.DB_Populate.orderlist.shippingDetails.address,
                        pincode:value.DB_Populate.orderlist.shippingDetails.pincode,
                        mobile:value.DB_Populate.orderlist.shippingDetails.mobile,
                    },
                    cartDetails:{
                      productItem:[].concat(value.DB_Populate.orderlist.productDetails),
                      totalItemsCost:value.DB_Populate.shoppingsummary.totalItemsCost,
                      totalItemsCount:value.DB_Populate.shoppingsummary.totalItemsCount
                      }
                    }]
                  }*/
