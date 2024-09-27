import styles from './Produtos.module.css';
import { api } from '../../services/api';
import { useEffect, useState, useRef } from 'react';
import { Menu } from '../../components/Menu/Menu';

export const Produtos = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);
  const [descricao, setDescricao] = useState('');
  const maxLength = 100;
  const nameRef = useRef(null);
  const descriptionRef = useRef(null);
  const priceRef = useRef(null);
  const imageRef = useRef(null);
  const categoryRef = useRef(null);

  const validCategories = [
    { value: "HAMBURGUERES", label: "Hambúrgueres" },
    { value: "COMBOS", label: "Combos" },
    { value: "ACOMPANHAMENTOS", label: "Acompanhamentos" },
    { value: "BEBIDAS", label: "Bebidas" }
  ];

  useEffect(() => {
    loadProducts();
  }, []);

  useEffect(() => {
    if (selectedCategory) {
      setFilteredProducts(products.filter(product => product.category === selectedCategory));
    } else {
      setFilteredProducts(products);
    }
  }, [selectedCategory, products]);

  async function loadProducts() {
    const response = await api.get("/products");
    setProducts(response.data);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!nameRef.current?.value || !descriptionRef.current?.value || !priceRef.current?.value || !imageRef.current?.value || !categoryRef.current?.value) return;

    const productData = {
      name: nameRef.current?.value,
      description: descriptionRef.current?.value,
      price: parseFloat(priceRef.current?.value),
      image: imageRef.current?.value,
      category: categoryRef.current?.value
    };

    if (editingProduct) {
      await api.put(`/product?id=${editingProduct.id}`, productData);
      setProducts(products.map(product => product.id === editingProduct.id ? { ...product, ...productData } : product));
      setEditingProduct(null);
      setDescricao('');
      alert('Produto editado com sucesso.');
    } else {
      const response = await api.post("/product", productData);
      setProducts(allProducts => [...allProducts, response.data]);
      setDescricao('');
      alert('Produto cadastrado com sucesso.')
    }

    nameRef.current.value = "";
    descriptionRef.current.value = "";
    priceRef.current.value = "";
    imageRef.current.value = "";
    categoryRef.current.value = "";
  }

  async function handleDelete(id) {
    try {
      await api.delete("/product", {
        params: { id }
      });
      const allProducts = products.filter((product) => product.id !== id);
      setProducts(allProducts);
      alert("Produto deletado com sucesso.");
    } catch(error) {
      console.log(error);
    }
  }

  function handleEdit(product) {
    setEditingProduct(product);
    nameRef.current.value = product.name;
    descriptionRef.current.value = product.description;
    setDescricao(product.description); 
    priceRef.current.value = product.price;
    imageRef.current.value = product.image;
    categoryRef.current.value = product.category;
  }

  const formatPrice = (price) => {
    let formattedPrice = price.toFixed(2);
  
    if (formattedPrice.endsWith('00')) {
      formattedPrice = formattedPrice.slice(0, -3); 
    } else if (formattedPrice.endsWith('0')) {
      formattedPrice = formattedPrice.slice(0, -1); 
    }
  
    return `R$${formattedPrice.replace('.', ',')}`;
  };

  return (
    <div className={styles.produtos}>
      <Menu></Menu>
      <main className={styles.wrapProdutos}>
        <h1>Cadastro de Produtos</h1>
        <form onSubmit={handleSubmit}>
          <label>Nome do produto: *</label>
          <input
            type="text"
            placeholder="Digite o nome do produto"
            ref={nameRef}
          />
          <div className={styles.wrapDesc}>
            <label>Descrição: *</label>
            <p>{descricao.length}/{maxLength}</p>
          </div>
          <textarea
            placeholder="Digite a descrição do produto"
            value={descricao}
            onChange={(e) => setDescricao(e.target.value)}
            ref={descriptionRef}
            maxLength={maxLength}
          />
          <label>Preço: *</label>
          <input
            type="text"
            placeholder="Digite o preço do produto"
            ref={priceRef}
          />
          <label>URL da imagem: *</label>
          <input
            type="url"
            placeholder="Digite a url da imagem"
            ref={imageRef}
          />
          <label>Categoria: *</label>
          <select ref={categoryRef} defaultValue="" required className={styles.category}>
            <option value="" disabled hidden>Selecione uma categoria</option>
            {validCategories.map(category => (
              <option key={category.value} value={category.value}>{category.label}</option>
            ))}
          </select>
          <button type="submit">{editingProduct ? 'Atualizar' : 'Cadastrar'}</button>
        </form>
        <div className={styles.filter}>
          <label>Filtrar por categoria: </label>
          <select onChange={(e) => setSelectedCategory(e.target.value)} value={selectedCategory}>
            <option value="">Todas as categorias</option>
            {validCategories.map(category => (
              <option key={category.value} value={category.value}>{category.label}</option>
            ))}
          </select>
        </div>
        {filteredProducts.length === 0 ? (
          <p className="loading">Carregando...</p>
        ) : (
          <section>
            {filteredProducts.map((product) => (
              <div className={styles.card} key={product.id}>
                <img src={product.image} alt="Imagem do produto"/>
                <p>{product.name}</p>
                <p className={styles.desc}>{product.description}</p>
                <p>Preço: {formatPrice(product.price)}</p>
                <div className={styles.wrapBtn}>
                  <button onClick={() => handleEdit(product)} className={styles.editButton}>Editar</button>
                  <button onClick={() => handleDelete(product.id)} className={styles.deleteButton}>Excluir</button>
                </div>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
