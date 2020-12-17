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
    console.log(this.titleElement.value);
  }

  private configure() {
    this.element.addEventListener('submit', this.submitHandler);
  }

  private attach() {
    this.hostElement.insertAdjacentElement('afterbegin', this.element);
  }
}

const prjInput = new ProjectInput();
