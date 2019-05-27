


export default class Store {

    activeItem = null

    items = []

    getItems() {

    }

    removeItem(fieldId) {
        this.items = this.items.filter(item => item.fieldId !== fieldId)
    }

    insertBefore() {

    }

    insertAfter() {

    }

    append(item) {
        this.items.push(item)
    }

    stringify() {

        return JSON.stringify(this.items);
    }
}