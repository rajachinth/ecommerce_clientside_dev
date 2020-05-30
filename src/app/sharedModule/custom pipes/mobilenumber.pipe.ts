import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name:"mobilepipe"
})
export class MobileNumberPipe implements PipeTransform
{   
    transform(value:any,countrycode:string)
    {
        let number=value.toString();    
        let encodednumber;
        switch(countrycode)
        {
            case "India":
                return encodednumber='+91'.concat(' ',number);
            case "USA || Canada":
                return encodednumber='+1'.concat(' ',number);
            case "Australia":
                return encodednumber='+61'.concat(' ',number);
            default:
                return null;
        }      
    }
}