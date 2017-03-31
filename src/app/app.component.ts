import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
} )

export class AppComponent implements OnInit, OnDestroy
{
    projForm: FormGroup;
    forbiddenProjNames = ['Test'];
    ngOnInit()
    {
        this.projForm = new FormGroup( {
            "projectname": new FormControl( null, Validators.required, this.validateProjNames ),
            "email": new FormControl( null, [Validators.required, Validators.email] ),
            "status": new FormControl( 'finished' )
        })
    }

    onSubmit()
    {
        console.log( this.projForm.get( 'projectname' ) );
        console.log( this.projForm.get( 'email' ) );
        console.log( this.projForm.get( 'status' ) );
    }

    validateProjNames( control: FormControl ): Promise<any> | Observable<any>
    {
        const promise = new Promise(( resolve, reject ) =>
        {
            setTimeout(() =>
            {
                if ( control.value == 'Test' )
                {
                    
                    resolve( {'InvalidProjName': true } );
                    console.log( control.value );
                } else
                {
                    resolve( null );
                }
            }, 1500 );
        } );
        return promise;
    }
          
/*
    validateProjNames( control: FormControl ): Observable<any>
    {
        const myObservable = Observable.create(( observer: Observer<any> ) =>
        {
            console.log( 1 );
            setTimeout(() =>
            {
                if ( control.value == 'Test' )
                    console.log( 2 );
                    observer.next( { "'InvalidProjName'": true } );
            }, 2000 )
        } );
        return myObservable;
    }
 */
    ngOnDestroy()
    {

    }

}
