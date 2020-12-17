interface Validatable {
  value: string | number;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(validateInput: Validatable) {
  let isValid = true;
  if (validateInput.required) {
    isValid = isValid && validateInput.value.toString().trim().length !== 0;
  }
  if (validateInput.minLength && typeof validateInput.value === 'string') {
    isValid =
      isValid && validateInput.value.trim().length > validateInput.minLength;
  }
  if (validateInput.maxLength && typeof validateInput.value === 'string') {
    isValid =
      isValid && validateInput.value.trim().length < validateInput.maxLength;
  }
  if (validateInput.min && typeof validateInput.value === 'number') {
    isValid = isValid && validateInput.value > validateInput.min;
  }
  if (validateInput.max && typeof validateInput.value === 'number') {
    isValid = isValid && validateInput.value < validateInput.max;
  }
  return isValid;
}

function autoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const ajustDes: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };
  return ajustDes;
}

class ProjectInput {
  templateElement: HTMLTemplateElement;
  hostElement: HTMLDivElement;
  element: HTMLFormElement;
  titleElement: HTMLInputElement;
  descriptionElement: HTMLInputElement;
  peopleElement: HTMLInputElement;

  constructor() {
    this.templateElement = document.getElementById(
      'project-input',
    )! as HTMLTemplateElement;
    this.hostElement = document.getElementById('app')! as HTMLDivElement;

    const importedNode = document.importNode(
      this.templateElement.content,
      true,
    );
    this.element = importedNode.firstElementChild as HTMLFormElement;
    this.element.id = 'user-input';

    this.titleElement = this.element.querySelector(
      '#title',
    ) as HTMLInputElement;
    this.descriptionElement = this.element.querySelector(
      '#description',
    ) as HTMLInputElement;
    this.peopleElement = this.element.querySelector(
      '#people',
    ) as HTMLInputElement;

    this.configure();
    this.attach();
  }

  @autoBind
  private submitHandler(event: Event) {
    event.preventDefault();
    const [title, description, people] = [
      this.titleElement.value,
      this.descriptionElement.value,
      this.peopleElement.value,
    ];
    const isValid = validate({ value: title, required: true, minLength: 2 });

    console.log(title, description, people);
    if (!isValid) {
      alert('Invalid');
    } else {
      this.clear();
    }
  }

  private clear() {
    this.titleElement.value = '';
    this.descriptionElement.value = '';
    this.peopleElement.value = '';
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
