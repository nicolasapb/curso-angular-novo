export class Alert {

    constructor(
        private readonly alertType: AlertType,
        private readonly message: string
    ) {}
}

export enum AlertType {

    SUCCESS,
    WARNING,
    DANGER,
    INFO
}
