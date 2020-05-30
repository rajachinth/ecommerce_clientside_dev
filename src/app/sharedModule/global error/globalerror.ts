import { ErrorHandler, Injectable } from "@angular/core";

@Injectable()
export class globalerror implements ErrorHandler
{
    handleError(errorresponse:Error)
    {
        console.log(`global error logged:${errorresponse.message}`);
    }
}