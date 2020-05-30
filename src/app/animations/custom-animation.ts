import { trigger, transition, query, useAnimation, group, animateChild, 
        sequence, state, style, stagger, animate } from "@angular/animations";
import { pulseAnimation, zoominAnimation,} from "./animatefunction";

export let customAnimationSetOne=[trigger('customeAnimationSetOne',[
    transition('void <=> *',[
        state('void',style({backgroundColor:'white',opacity:0})),
        state('*',style({backgroundColor:'white',opacity:1})),
        sequence([
            query('@pulse',animateChild(),{optional:true}),
        ]), 
        group( [
                query('form',useAnimation(zoominAnimation),{optional:true,}),
                query('@zoomin',stagger(500,animateChild()),{optional:true,}),
            ] )
    ])
    ]),
    trigger('pulse',[
        state('animationStateOne',style({backgroundColor:'white',opacity:1})),
        state('animationStateTwo',style({backgroundColor:'white',opacity:1})),
        transition('animationStateOne <=> animationStateTwo',useAnimation(pulseAnimation)),
    ]),
    trigger('zoomin',[
        state('void',style({backgroundColor:'white',opacity:1})),
        state('animationStateOne',style({backgroundColor:'white',opacity:1})),
        state('animationStateTwo',style({backgroundColor:'white',opacity:1})),
        transition('void <=> animationStateOne',useAnimation(zoominAnimation)),
        transition('void <=> animationStateTwo',useAnimation(zoominAnimation)),
        transition('animationStateOne <=> animationStateTwo',useAnimation(zoominAnimation)),
    ]),
]
export let customAnimationSetTwo=[trigger('customeAnimationSetTwo',[
        transition('AnimationPathOne <=> AnimationPathThree',[
            query(':enter,:leave',style({position:'fixed',width:'100%'})),
            group([
                query(':enter', [
                    style({ transform: 'translateX(-100%)' }),
                    animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
            ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
                ], { optional: true }),
            ]),
            query('@zoomin',stagger(500,animateChild()),{optional:true,}),
        ]),
        transition('AnimationPathOne <=> AnimationPathTwo',[
            query(':enter,:leave',style({position:'fixed',width:'100%'})),
            group([
                query(':enter', [
                    style({ transform: 'translateX(-100%)' }),
                    animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
               ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
                ], { optional: true }),
            ]),
            query('@zoomin',stagger(500,animateChild()),{optional:true,}),
        ]),
        transition('AnimationPathTwo <=> AnimationPathThree',[
            query(':enter,:leave',style({position:'fixed',width:'100%'})),
            group([
                query(':enter', [
                    style({ transform: 'translateX(-100%)' }),
                    animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
               ], { optional: true }),
                query(':leave', [
                    style({ transform: 'translateX(0%)' }),
                    animate('0.5s ease-in-out', style({ transform: 'translateX(100%)' }))
                ], { optional: true }),
            ]),
           // query(':enter', [
                //style({ transform: 'translateX(-100%)',opacity:0 }),
                //animate('0.5s ease-in-out', style({ transform: 'translateX(0%)' }))
                //useAnimation(bounceLeftAnimation),
           // ], { optional: true }),
            query('@zoomin',stagger(500,animateChild()),{optional:true,}),
])]),
trigger('zoomin',[
    state('void',style({backgroundColor:'white',opacity:1})),
    state('animationStateOne',style({backgroundColor:'white',opacity:1})),
    state('animationStateTwo',style({backgroundColor:'white',opacity:1})),
    transition('void <=> animationStateOne',useAnimation(zoominAnimation)),
    transition('void <=> animationStateTwo',useAnimation(zoominAnimation)),
    transition('animationStateOne <=> animationStateTwo',useAnimation(zoominAnimation)),
]),]