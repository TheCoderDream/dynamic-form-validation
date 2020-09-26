interface Control {
    value: string,
    validators?: Array<(...args: string[]) => boolean>;
    state?: {
      touched?: boolean,
      valid?: boolean
    },
    match?: string;
    errorMessage: string;
}

interface FormControls {
  [key: string]: Control;
}

export class FormGroup {
  valid: boolean = false;
  constructor(public formControls: FormControls, public formGroup: HTMLFormElement, public buttonName?: string){
    this.initialize();
    this.registerChangeEvent();
  }

  registerChangeEvent() {
    this.formGroup.addEventListener('input', (e: InputEvent) => {
      if (!this.formControls[e.target.name]) return;
      const input = this.formGroup[e.target.name] as HTMLInputElement;
      const controller = this.formControls[e.target.name];
      controller.value = e.target.value;
      controller.state.touched = true;
      this.showError(input, controller);
      this.valid = Object.values(this.formControls).every(v => v.state.valid);
      this.setButtonStatus();
    })
  }

  showError(input: HTMLInputElement, controller: Control) {
    const valid = this.checkError(controller);
    controller.state.valid = valid;
    if (!valid) {
      input.parentElement.classList.add('error');
    } else {
      input.parentElement.classList.remove('error');
    }
  }

  private initialize() {
    for (let [key, control] of Object.entries(this.formControls)) {
      control.value = control.value || '';
      control.state = {
        touched: control?.state?.touched || false,
        valid: control?.validators?.map(v => v(this.formGroup[key].value)).every(v => v) || false
      };
      if (control.state.touched && !control.state.valid) {
        (this.formGroup[key] as HTMLInputElement).parentElement.classList.add('error');
      }
      this.setErrorMessages(this.formGroup[key],control );
    }
    this.valid = Object.values(this.formControls).every(v => v.state.valid);
    this.setButtonStatus();
  }

  private checkError(controller: Control): boolean {
    let matched = true;
    if (controller.match) {
      const matchedController = this.formControls[controller.match];
      matched = matchedController.value === controller.value;
    }
    return controller?.validators?.map(v => v(controller.value)).every(v => v) && matched;
  }

  private setButtonStatus() {
          if(this.buttonName) {
        if (!this.valid) {
          this.formGroup[this.buttonName].classList.add('disabled');
        } else {
          this.formGroup[this.buttonName].classList.remove('disabled');
        }
      }
  }

  setErrorMessages(input: HTMLInputElement, control: Control) {
    input.nextElementSibling.textContent = control.errorMessage;
  }

}