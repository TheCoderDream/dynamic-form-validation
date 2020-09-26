export const validators = {
  required(value: string): boolean{
    return value !== undefined && value !== null && value.trim() !== '';
  },
  isEmail(value: string): boolean {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    return re.test(value.trim());
  },
  checkPasswordsMatchWith(anotherInput: HTMLInputElement): (value: string) => boolean {
    return function(value) {
      return value === anotherInput.value;
    }
  },
  checkLenght(len: number):(value: string) => boolean {
    return function (value: string): boolean {
      return value.length === len;
    }
  }
}