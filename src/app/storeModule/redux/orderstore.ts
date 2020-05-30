import { ADDORDER, DELETEORDER, CLEARORDER } from './coreaction';


export interface OrderState
{
    orderList:{id:string,customerDetails:Object,cartDetails:Object,orderDate:Date}[]
}

export const ORDERINITSATE:OrderState={
    orderList:[{id:'',customerDetails:{},cartDetails:{},orderDate:null}]
}

export function orderStateReducer(state:OrderState=ORDERINITSATE,action):OrderState
{
        switch(action.type)
        {
            case ADDORDER:
                let obj;
                if(action.data.orderDate){
                obj={id:action.data.cartorderID,customerDetails:action.data.CustomerDetails,
                        cartDetails:action.data.orderDetails,orderDate:action.data.orderDate};
                }
                else
                {
                obj={id:action.data.cartorderID,customerDetails:action.data.CustomerDetails,
                        cartDetails:action.data.orderDetails,orderDate:new Date()};
                }
                if(state.orderList.length < 1) return {orderList:[obj]};
                else return {orderList:state.orderList.concat(obj)};
            case DELETEORDER:
                console.log(action.data.orderID);
                let filterArray=state.orderList.filter(element=>element.id !== action.data.orderID);
                console.log(filterArray);
                return {orderList:filterArray};
            case CLEARORDER:
                return {orderList:ORDERINITSATE.orderList};
            default:
                return state;
        }

}