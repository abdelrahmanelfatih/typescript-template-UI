import React, { useState, ChangeEvent, FormEvent } from 'react';
import styled from 'styled-components';

// Styled components
const Container = styled.div`
  background-color: #f8f8f8;
  padding: 15px;
  border-radius: 10px;
  max-width: 360px;
  margin: auto;
  font-family: Arial, sans-serif;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;

  button {
    background: none;
    border: none;
    color: #007bff;
    font-size: 14px;
    cursor: pointer;
  }

  h1 {
    font-size: 20px;
    font-weight: normal;
    margin: 0;
    span {
      font-size: 12px;
      color: #999;
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;

  label {
    display: block;
    margin-bottom: 5px;
    color: #333;
    font-size: 14px;
  }

  input, select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 5px;
    font-size: 14px;
    box-sizing: border-box;
  }

  small {
    color: red;
    font-size: 12px;
  }

  .input-group {
    display: flex;
    align-items: center;

    .attach-btn {
      background-color: #f8f8f8;
      border: 1px solid #ccc;
      border-radius: 5px;
      padding: 6px 8px;
      margin-left: 10px;
      cursor: pointer;

      img {
        width: 18px;
        height: 18px;
      }
    }

    input[type="file"] {
      display: none;
    }
  }
`;

const ItemList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0 0 15px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
    border-bottom: 1px solid #ccc;

    span {
      font-weight: bold;
      font-size: 14px;
    }

    input {
      width: 50px;
      margin-left: 10px;
      font-size: 14px;
    }
  }
`;

const Total = styled.div`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 15px;
`;

const InvoiceSettings = styled.div`
  margin-bottom: 15px;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;

    label {
      font-size: 14px;
    }

    input[type='checkbox'] {
      width: 30px;
      height: 15px;
    }
  }
`;

const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  padding: 12px;
  border: none;
  border-radius: 5px;
  width: 100%;
  cursor: pointer;
`;

type Item = {
  name: string;
  quantity: number;
  price: number;
};

type Settings = {
  requireName: boolean;
  requireEmail: boolean;
  requirePhone: boolean;
  protectContent: boolean;
};

function App() {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [currency, setCurrency] = useState<string>('USD');
  const [items, setItems] = useState<Item[]>([]);
  const [total, setTotal] = useState<number>(0.00);
  const [settings, setSettings] = useState<Settings>({
    requireName: true,
    requireEmail: true,
    requirePhone: true,
    protectContent: true,
  });
  const [image, setImage] = useState<string | null>(null);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>, setter: React.Dispatch<React.SetStateAction<any>>) => {
    setter(e.target.value);
  };

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>, setting: keyof Settings) => {
    setSettings({
      ...settings,
      [setting]: e.target.checked,
    });
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleAddTitle = () => {
    if (title.trim() && !items.some(item => item.name === title)) {
      setItems([...items, { name: title, quantity: 1, price: 0 }]);
      setTitle('');
    }
  };

  const handleItemDetailChange = (index: number, field: keyof Item, value: string) => {
    const updatedItems = items.map((item, i) =>
      i === index
        ? { ...item, [field]: field === 'price' ? parseFloat(value) : parseInt(value) }
        : item
    );
    setItems(updatedItems);
    calculateTotal(updatedItems);
  };

  const calculateTotal = (updatedItems: Item[]) => {
    const newTotal = updatedItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
    setTotal(newTotal);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const invoiceData = {
      title,
      description,
      currency,
      items,
      total,
      settings,
      image,
    };
    console.log("Invoice Data:", invoiceData);
    alert('Invoice Created! Check the console for details.');
  };

  return (
    <Container>
      <Header>
        <button onClick={() => alert('Cancelled!')}>Cancel</button>
        <h1>Mr Crab <span>bot</span></h1>
      </Header>

      <form onSubmit={handleFormSubmit}>
        <FormGroup>
          <label>Title</label>
          <input
            type="text"
            placeholder="Item title"
            value={title}
            onChange={(e) => handleInputChange(e, setTitle)}
          />
          <button type="button" onClick={handleAddTitle}>Add Title</button>
        </FormGroup>

        <FormGroup>
          <label>Description</label>
          <div className="input-group">
            <input
              type="text"
              placeholder="Product description, 1-255 characters"
              value={description}
              onChange={(e) => handleInputChange(e, setDescription)}
            />
            <label className="attach-btn">
              <img src="https://cdn-icons-png.flaticon.com/512/860/860790.png" alt="Attach" />
              <input type="file" onChange={handleFileChange} />
            </label>
          </div>
          {image && <img src={image} alt="Preview" style={{ maxWidth: '100px', marginTop: '10px' }} />}
          <small>Product description, 1-255 characters</small>
        </FormGroup>

        <FormGroup>
          <label>Currency</label>
          <select
            value={currency}
            onChange={(e) => handleInputChange(e, setCurrency)}
          >
            <option value="USD">USD</option>
            <option value="EUR">EURO</option>
            <option value="GBP">GBP</option>
            <option value="MYR">MYR</option>
            <option value="CNY">Renminbi</option>
          </select>
        </FormGroup>

        <ItemList>
          {items.map((item, index) => (
            <li key={index}>
              <span>{item.name}</span>
              <input
                type="number"
                min="0"
                value={item.quantity}
                onChange={(e) => handleItemDetailChange(index, 'quantity', e.target.value)}
              />
              <input
                type="number"
                step="0.01"
                min="0"
                value={item.price}
                onChange={(e) => handleItemDetailChange(index, 'price', e.target.value)}
              />
              <span>{(item.quantity * item.price).toFixed(2)}</span>
            </li>
          ))}
        </ItemList>

        <Total>Total: {total.toFixed(2)}</Total>

        <InvoiceSettings>
          <div>
            <label>Require name</label>
            <input
              type="checkbox"
              checked={settings.requireName}
              onChange={(e) => handleCheckboxChange(e, 'requireName')}
            />
          </div>
          <div>
            <label>Require email</label>
            <input
              type="checkbox"
              checked={settings.requireEmail}
              onChange={(e) => handleCheckboxChange(e, 'requireEmail')}
            />
          </div>
          <div>
            <label>Require phone number</label>
            <input
              type="checkbox"
              checked={settings.requirePhone}
              onChange={(e) => handleCheckboxChange(e, 'requirePhone')}
            />
          </div>
          <div>
            <label>Protect content</label>
            <input
              type="checkbox"
              checked={settings.protectContent}
              onChange={(e) => handleCheckboxChange(e, 'protectContent')}
            />
          </div>
        </InvoiceSettings>

        <Button type="submit">Create Invoice</Button>
      </form>
    </Container>
  );
}

export default App;
