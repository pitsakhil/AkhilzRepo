import { Component, OnInit } from '@angular/core';
import { FieldConfig } from '../../../models/field-config.interface';
import { FormGroup, Validators } from '@angular/forms';
import { HelperService } from '../../../../../core/services';

@Component({
    selector: 'app-label-input-renderer',
    templateUrl: './label-input-renderer.component.html',
    styleUrls: ['./label-input-renderer.component.scss']
})
export class LabelInputRendererComponent implements OnInit {
    public config: FieldConfig;
    public group: FormGroup;
    public copy: FieldConfig;
    public formindex: number;
    constructor(private helperService: HelperService) { }

    ngOnInit() {
        this._init();
    }

    /**
    * function to get current module from local storage
    *
    * @author Vishnu BK<vishnu.bk@pitsolutions.com>
    */
    getCurrentModule() {
        return localStorage.getItem('currentModule');
    }

    private _init() {

        this._manageCloning();
    }

    /**
    * function to add validations
    * @param config
    * @param group
    *
    * @author Vishnu BK<vishnu.bk@pitsolutions.com>
    */
    private _setValidators(config: FieldConfig, group: FormGroup): void {
        if (!config || !group) {
            return;
        }

        const $controlName: string = config['field_name'];
        const validatorArray = [];
        if (config.field_validation) {

            if (config.field_validation['field_required']) {
                validatorArray.push(Validators.required);
            }
            if (config.field_validation['is_alpha']) {
                validatorArray.push(this.helperService.validateAlphabets);
            }
            group.controls[$controlName].setValidators(validatorArray);
        }


    }

    /**
    * This function will patch the field value to control
    * @param config
    * @param group
    *
    * @author Vijayan PP<vijayan.pp@pitsolutions.com>
   */
    private _patchFormValue(config: FieldConfig, group: FormGroup): void {
        if (!config || !group) {
            return null;
        }
        // tslint:disable-next-line:no-unused-expression
        (group.controls[config['index']]) ? group.controls[config['index']].patchValue(config.field_value) : group.controls[config['field_name']].patchValue(config.field_value);

    }

    /**
     * This function will handle the cloning in input control
     *
     * @author Vijayan PP<vijayan.pp@pitsolutions.com>
    */
    private _manageCloning() {
        this.copy = JSON.parse(JSON.stringify(this.config));
        const cloneTitle = localStorage.getItem('cloning');
        localStorage.removeItem('cloning');
        if (cloneTitle) {
            if (this.copy['field_title']) {
                this.copy['field_title'] = cloneTitle;
            }
        }
        this._setValidators(this.copy, this.group);
        this._patchFormValue(this.copy, this.group);
    }

}
