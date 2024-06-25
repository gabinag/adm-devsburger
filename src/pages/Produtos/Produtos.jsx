import styles from './Produtos.module.css';
import { api } from '../../services/api';
import { useEffect, useState, useRef } from 'react';
import {Menu} from '../../components/Menu/Menu';

export const Produtos = () =>  {

  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    loadProducts();
  }, [])

  async function loadProducts() {
    const response = await api.get("/products");
    setProducts(response.data);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!nameRef.current?.value || !descriptionRef.current?.value || !priceRef.current?.value || !imageRef.current?.value) return;

    const productData = {
      name: nameRef.current?.value,
      description: descriptionRef.current?.value,
      price: parseFloat(priceRef.current?.value), 
      image: imageRef.current?.value
    };

    if (editingProduct) {
      await api.put(`/product?id=${editingProduct.id}`, productData);
      setProducts(products.map(product => product.id === editingProduct.id ? { ...product, ...productData } : product));
      setEditingProduct(null);
    } else {
      const response = await api.post("/product", productData);
      setProducts(allProducts => [...allProducts, response.data]);
    }

    nameRef.current.value = ""
    descriptionRef.current.value = ""
    priceRef.current.value = ""
    imageRef.current.value = ""
  }

  async function handleDelete(id) {
    try {
      await api.delete("/product", {
        params: { id }
      });
      const allProducts = products.filter((product) => product.id !== id);
      setProducts(allProducts);
    } catch(error) {
      console.log(error);
    }
  }

  function handleEdit(product) {
    setEditingProduct(product);
    nameRef.current.value = product.name;
    descriptionRef.current.value = product.description;
    priceRef.current.value = product.price;
    imageRef.current.value = product.image;
  }

  return (
    <div className={styles.produtos}>
      <Menu></Menu>
      <main className={styles.wrapProdutos}>
        <h1>Cadastro de Produtos</h1>
        <form onSubmit={handleSubmit}>
          <label>Nome do produto:</label>
          <input
            type="text"
            placeholder="Digite o nome do produto"
            ref={nameRef}
          />
          <label>Descrição:</label>
          <input
            type="text"
            placeholder="Digite o a descrição do produto"
            ref={descriptionRef}
          />
          <label>Preço:</label>
          <input
            type="number"
            placeholder="Digite o preço do produto"
            ref={priceRef}
          />
          <label>URL da imagem:</label>
          <input
            type="url"
            placeholder="Digite a url da imagem"
            ref={imageRef}
          />
          <button type="submit">{editingProduct ? 'Atualizar' : 'Cadastrar'}</button>
        </form>
        <section>
          {products.map((product) => (
            <div className={styles.card} key={product.id}>
              <img src={product.image} alt=""/>
              <p>{product.name}</p>
              <p>{product.description}</p>
              <p>Preço: R${product.price}</p>
              <button onClick={() => handleEdit(product)}>Editar</button>
              <button onClick={() => handleDelete(product.id)}>Excluir</button>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
