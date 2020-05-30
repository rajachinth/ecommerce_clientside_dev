import { ADDCART, DELETECART, CLEARCART, RESTORECART } from './coreaction';

export interface CartStore
{
    productItem:Array<any>,
    totalItemsCount:number,
    totalItemsCost:number
}

export const CARTINITSTATE:CartStore={
    productItem:[],
    totalItemsCount:0,
    totalItemsCost:0
}

function addCart(state,action)
{
    let newobj={productID:action.data.productID,title:action.data.title,price:action.data.price,itemCount:1,imageURL:action.data.imageURL};
            let newArrayID;
            let optimisticCount:number=0;
            let totalCart;
            if(state.productItem.length == 0)
                return {productItem:state.productItem.concat(newobj),totalItemsCount:1,totalItemsCost:action.data.price};

            const arrayAdd=state.productItem.map(element=>{
                    if(element.productID == action.data.productID)
                    {
                        optimisticCount=1;
                        return  {   'productID':newArrayID=action.data.productID,
                                    'title':action.data.title,
                                    'price':action.data.price,
                                    'itemCount':element.itemCount+1,
                                    'imageURL':action.data.imageURL
                                }
                    }
                        return element;
                });

            if(optimisticCount>0)
            {
                totalCart=getCartItemsCount(arrayAdd,0,0);
                optimisticCount=0;
            }       
            else
                totalCart=getCartItemsCount(arrayAdd,1,action.data.price);

            if(newArrayID == action.data.productID)
                return {productItem:arrayAdd,totalItemsCount:totalCart.itemCount,totalItemsCost:totalCart.itemCost};
            else
                return {productItem:state.productItem.concat(newobj),totalItemsCount:totalCart.itemCount,totalItemsCost:totalCart.itemCost};
}

function deleteCart(state,action)
{
    const arrayDelete=state.productItem.map((element)=>{
        if(element.productID == action.data.productID && element.itemCount > 0)
        {
            return  {       'productID':action.data.productID,
                            'title':action.data.title,
                            'price':action.data.price,
                            'itemCount':element.itemCount-1,
                            'imageURL':action.data.imageURL
                        }
        }
        return element;
    });

    const filterArray=arrayDelete.filter((element)=>element.itemCount > 0);

    const totalCart=getCartItemsCount(filterArray,0,0)

    return {productItem:filterArray,totalItemsCount:totalCart.itemCount,totalItemsCost:totalCart.itemCost};
}

function getCartItemsCount(filterArray,optimisticCount,optimisticCost)
{
    let count=0;
    let cost=0;
    let totalCartItem:[]=filterArray;
    totalCartItem.forEach(function(elementItem:any)
    {   count=count+elementItem.itemCount; 
        totalCartItem.find((element:any)=>{
            if(element.productID == elementItem.productID)  cost=cost+(element.price*element.itemCount);
        }); 
    
    })
    return {itemCount:count+optimisticCount,itemCost:cost+optimisticCost}
}

export function CartStateReducer(state:CartStore=CARTINITSTATE,action):CartStore
{
    switch(action.type)
    {
        case ADDCART: return addCart(state,action);
        case DELETECART: return deleteCart(state,action);
        case CLEARCART: return Object.assign({},state,CARTINITSTATE);
        case RESTORECART: return Object.assign({},{productItem:action.data.cartList,
            totalItemsCount:action.data.itemCount,totalItemsCost:action.data.itemCost});
        default:
            return state
    }
}   

