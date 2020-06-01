import {trigger, state, style, animation, animate, keyframes,
        transition, useAnimation} from '@angular/animations';

export let pulseAnimation = animation(
    animate('{{duration}} {{delay}} {{easing}}', keyframes([
        style({
            offset: 0,
            transform: 'scale3d(1,1,1)',
        }),
        style({
            offset: 0.25,
            transform: 'scale3d(1.05,1.05,1.05)'
        }),
        style({
            offset: 0.75,
            transform: 'scale3d(1,1,1)'
        })
    ])),
    {params: {
        duration: '2s',
        delay: '0s',
        easing: 'ease-in'
    }}
);

export let zoominAnimation = animation(
    animate('{{duration}} {{delay}} {{easing}}', keyframes([
        style({
            offset: 0,
            transform: 'scale3d(0.4,0.4,0.4)',
            opacity: 0
        }),
        style({
            offset: 0.5,
            transform: 'scale3d(1,1,1)',
            opacity: 1
        }),
    ])),
  {params: {
        duration: '2s',
        delay: '0s',
        easing: 'ease-in'
    }}
);

export let bounceLeftAnimation = animation(
    animate('{{duration}} {{delay}} {{easing}}', keyframes([
        style({
            offset: 0,
            opacity: 1,
            transform: 'translate3d(20px,0,0)'
        }),
        style({
            offset: .5,
            opacity: 0,
            transform: 'translateX(-100%)'
        })
    ])),
    {params: {
        duration: '2s',
        delay: '0s',
        easing: 'ease-in'
    }}
);

export let fadeInDownAnimation = animation(
    animate('{{duration}} {{delay}} {{easing}}', keyframes([
        style({
            offset: 0,
            opacity: 0,
            transform: 'translateY(-100%)'
        }),
        style({
            offset: .6,
            opacity: 1,
            transform: 'translateY(0%)'
        })
    ])),
    {params: {
        duration: '2s',
        delay: '0s',
        easing: 'ease-in'
    }}
);

export let fadeOutDownAnimation = animation(
    animate('{{duration}} {{delay}} {{easing}}', keyframes([
    style({
        offset: .0,
        opacity: 1,
        transform: 'translateY(0%)'
    }),
    style({
        offset: .6,
        opacity: 0,
        transform: 'translateY(+100%)'
    })
    ])), {
    params: {
        duration: '2s',
        delay: '0s',
        easing: 'ease-in'
    }
});

export let fadeInOutDown = trigger('fadeInOutDown', [
    state('void', style({backgroundColor: 'white', opacity: 1})),
    state('*', style({backgroundColor: 'white', opacity: 1})),
    transition('void => *', useAnimation(fadeInDownAnimation)),
    transition('* => void', useAnimation(fadeOutDownAnimation))
]);

export let bounceLeft = trigger('bounceLeft', [
    state('void', style({backgroundColor: 'white', opacity: 1})),
    state('*', style({backgroundColor: 'white', opacity: 1})),
    transition('void=>*', useAnimation(bounceLeftAnimation))
]);

export let pulse = trigger('pulse', [
    state('animationStateOne', style({backgroundColor: 'white', opacity: 1})),
    state('animationStateTwo', style({backgroundColor: 'white', opacity: 1})),
    transition('animationStateOne <=> animationStateTwo', useAnimation(pulseAnimation)),
]);

export let Cpulse = trigger('pulse', [
    state('void', style({backgroundColor: 'white', opacity: 1})),
    state('*', style({backgroundColor: 'white', opacity: 1})),
    transition('void => *', useAnimation(pulseAnimation)),
]);

export let zoomin = trigger('zoomin', [
   state('void', style({backgroundColor: 'white', opacity: 0})),
   state('*', style({backgroundColor: 'white', opacity: 1})),
    transition('void => *', useAnimation(zoominAnimation)),
]);

export let customeZoominState = trigger('zoomin', [
    state('void', style({backgroundColor: 'white', opacity: 0})),
    state('*', style({backgroundColor: 'white', opacity: 1})),
    state('animationStateOne', style({backgroundColor: 'white', opacity: 1})),
    state('animationStateTwo', style({backgroundColor: 'white', opacity: 1})),
    transition('void <=>*', useAnimation(zoominAnimation)),
    transition('animationStateOne <=> animationStateTwo', useAnimation(zoominAnimation)),
]);
