export default class Productos {

    constructor(db, actualRef) {
        this.productosRef = db.collection(actualRef);
    }

    async getProductos() {
        const prods = [];

        try {
            const snapshot = await this.productosRef.get();
            snapshot.forEach(doc => {
                prods.push({ id: doc.id, ...doc.data() });
            });
        } catch (error) {
            console.log('Error Getting Product: ', error);
        }

        return prods;
    }

    async getProducto(id) {
        let producto;

        try {
            const snapshot = await this.productosRef.doc(id).get();
            producto = { id: snapshot.id, ...snapshot.data() };
        } catch (error) {
            console.log('Error Getting Product: ', error);
        }

        return producto;
    }

    async addProducto(producto) {
        // Espera un objeto del tipo: { name: '', price: 0, description: '', size: '', img: '' }
        try {
            await this.productosRef.add(producto);
        } catch (error) {
            console.log('Error Adding Product: ', error);
        }
    }

    async deleteProducto(id) {
        try {
            await this.productosRef.doc(id).delete();
        } catch (error) {
            console.log('Error Deleting Product: ', error);
        }
    }
}