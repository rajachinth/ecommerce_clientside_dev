## Online-Bookshelf (front-end Angular application)

This is a ecommerce application build on [Angular CLI](https://github.com/angular/angular-cli) version 8.3.20.

## Out-Line of the Project
Application is designed for a `normal user` and the `Admin user`.  

▶ Admin user can modify the shopping list products and can manage all the orders(`this route is in development stage currently`).  

▶ A normal user can place order and can view his past and current orders in his order list.  

▶ New user can register under sign-up route with membership details(`prime or non-prime`).  

▶ Every user should have a unique ID used to login, here we are checking for the duplicates in data-base before user sign-up, this helps to avoids duplicates user login ID's in database.  

▶ LoggedIn user can add products to his cart and place order and can also delete the order if required.  

## Route Protection and Lazy Loading 
 
Implemented Route protection from the un-authorized user, in this project the admin can only edit the product & orders. So authguard is used on this routes where non-admin user cant access this route.

Lazy loading is used for the bettter efficiency and reduce load time, since by default angular is a eagarly loaded its cost much while application grows the size.

Below is the feature modules that are loaded lazily(`debugged using Augury`)  

![augury_flow_chart](readme_images/application_routing_flow.png)

## Redux State Management

Used Redux state management for having a singleton store for managing all the components behaviour. Check the source code for the detailed break-down of the logic written for this ecommerce apllication.  

Below is the Redux State Management graph(`debugged using NgRedux debugging Tool`)  

![redux_state_management](readme_images/application_redux_state_management.png)

## Angular Animations

Used built-in angular animation library which is build on top of the `web animation API`.  

Angular has module "angular/anmations" build on top of standard "web animation API", so it directly work on
this angular abstract methods derived from `"web animation API"`.  

**use polyfil code to run modern JS code/modules in old browsers
         go to polyfil.ts and uncomment the code-lines required and install 
         that mentioned package using NPM or any other external modules**

state 1 -------`transistion`-------> state 2  

**Angular has 3 different states**  
1.Void  
2.Default(*) or wildcard state  
3.Custom  

**Void state**: I this state the elements are not pasrt of DOM  
    ex: when we add elements to the DOM then, void state of elements --------> default(*) state of elements  
    
**Default state**: in this state element are present in the DOM  
    ex: whene we remove elements from the DOM then, default(*) state of element------->void state of element  
**Custom state**:in this state, we change the outlook of the DOM element  
    ex: on clicking the "address" button this button expands to display address and again when we clicking  
    on this again it collapse. Here we changing default/void state--->custome state  
**CODE-1**  
 trigger('fade',[
      state('void',style({backgroundColor:'red',opacity:0})),
      state('*',style({backgroundColor:'white',opacity:1})),
      transition('void => *',[
      animate(2000)
    ]),
    transition('* => void',[
      animate(2000) 
    ])
  ])]
})  
**CODE-2**  
trigger('<triggername>',[
    state('<state_name>',style({<styles>})),
    transistion('void => *',[
        style();
        animation(<animation duration>,style())
    ])
])  
**CODE-3**  
 trigger('fade',[
      state('void',style({backgroundColor:'red',opacity:0})),
      state('*',style({backgroundColor:'white',opacity:1})),
      transition(':enter,:leave',[animate(2000)]),
])]
