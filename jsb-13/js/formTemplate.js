const formTemplate = {
    tag: "form",
    cls: ["form", ],
    attrs: {
        action: "./",
        method: "GET",
        novalidate: true,
    },
    content: [
        {
            tag: "div",
            cls: ["form__field", ],
            content: [
                {
                    tag: "input",
                    cls: ["form__input", "form__input_long-link", ],
                    attrs: {
                        type: "text",
                        placeholder: "Введите длинную ссылку",
                        pattern: "^(https?:\\/\\/|ftp:\\/\\/)?(\\w+\\.)+\\w{2,9}\\/?(\\w+\\/?)*(\\?(\\w+=\\w*(&\\w+=\\w*)*)?)?$",
                        name: "long",
                        required: true,
                    },
                },
            ],
        },
        {
            tag: "div",
            cls: ["form__field", ],
            content: [
                {
                    tag: "button",
                    cls: ["form__button", "form__button_submit", ],
                    attrs: {
                        type: "submit"
                    },
                    content: ["Сделать короткую ссылку"],
                },
            ],
        },
        {
            tag: "div",
            cls: ["form__field", "form__field_result", "form__hidden", ],
            content: [
                {
                    tag: "p",
                    cls: ["form__text", ],
                    content: [
                        {
                            tag: "a",
                            cls: ["form__text", "form__text_link", ],
                            attrs: {
                                href: "./",
                                target: "_blank",
                            },
                            content: ["123456", ],
                        },
                        {
                            tag: "i",
                            cls: ["fa-solid", "fa-clone", "form__copy"],
                        },
                    ],
                },
            ],
        },

    ],
};
