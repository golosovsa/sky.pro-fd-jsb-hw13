const ERRORS = {
    "long": {
        valueMissing: "Забыл ссылку!",
        patternMismatch: "Это точно ссылка?",
    }
};

class Form {

    constructor(parent) {
        this.element = templateEngine(formTemplate);

        this.element.addEventListener("submit", this.onSubmit.bind(this));

        const inputs = this.element.querySelectorAll(".form__input");

        inputs.forEach(input => {
            input.addEventListener("change", (event) => {
                event.target.classList.remove("form__input_error");
            })
        });

        const copyButton = this.element.querySelector(".form__copy");
        copyButton.addEventListener("click", this.onCopy.bind(this));

        parent.appendChild(this.element);

    }

    onSubmit(event) {
        event.preventDefault();

        const result = this.element.querySelector(".form__field_result");
        result.classList.add("form__hidden");


        const error = validateForm(this.element);
        if (error !== undefined) {
            const message = ERRORS[error.element.name][error.errorCode];
            const popup = new Popup(
                this.element,
                message,
                {
                    left: "20px",
                    top: "30px",
                    right: "auto",
                    bottom: "auto",
                },
                3000,
            );
            
            error.element.classList.add("form__input_error");
            return;
        }

        const linkElement = this.element.querySelector(".form__input_long-link");
        const link = linkElement.value; 
        // const url = `https://api.1pt.co/addURL?long=${link}`;
        const request = new XMLHttpRequest()

        const url = "http://thakkaha.dev.fast.sheridanc.on.ca/pme/1pt/addURL.php?url=" + link;

        this.disableForm()

        request.open("GET", url);
        request.onload = this.onReceive.bind(this);
        request.onerror = this.onErrorReceive.bind(this);
        request.send();
    }

    disableForm() {
        const linkElement = this.element.querySelector(".form__input_long-link");
        const button = this.element.querySelector(".form__button_submit");
        linkElement.disabled = true;
        button.disabled = true;
        button.classList.add("form__button_loading");
    }

    enableForm() {
        const linkElement = this.element.querySelector(".form__input_long-link");
        const button = this.element.querySelector(".form__button_submit");
        linkElement.disabled = false;
        button.disabled = false;
        button.classList.remove("form__button_loading");
    }

    onReceive(event) {
        this.enableForm();

        const data = JSON.parse(event.srcElement.response);

        const shortLink = `http://1pt.co/${data.short}`;

        console.log(shortLink);
        const result = this.element.querySelector(".form__field_result");
        const linkElement = result.querySelector(".form__text_link");
        linkElement.setAttribute("href", shortLink);
        linkElement.textContent = linkElement;
        
        result.classList.remove("form__hidden");
    }

    onErrorReceive(event) {
        this.enableForm();

        const popup = new Popup(
            this.element,
            "Сервер устал...",
            {
                left: "20px",
                top: "30px",
                right: "auto",
                bottom: "auto",
            },
            3000,
        );
    }

    onCopy(event) {
        const linkElement = this.element.querySelector(".form__text_link");
        const link = linkElement.getAttribute("href");
        navigator.clipboard.writeText(link);

        const popup = new Popup(
            this.element,
            "Ссылка скопирована",
            {
                left: "20px",
                top: "30px",
                right: "auto",
                bottom: "auto",
            },
            3000,
        );
    }
}