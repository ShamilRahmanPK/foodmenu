import logo from './assets/logo.png'
import bgImage1 from './assets/bgImage1.jpg'
import leafDesign from './assets/leafDesign.png'
import bgImage2 from './assets/bgimage2.png'
import leftDesign from './assets/leftDesign.png'
import rightDesign from './assets/rightDesign.png'
import orangejuice from './assets/orangejuice.png'
import cocktail from './assets/cocktai.png'
import './App.css'
import { useEffect, useState } from 'react'
import { addMenuAPI, getAllMenuAPI } from './services/allAPI'

function App() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [menuData, setMenuData] = useState({
    menuName: '',
    menuItems: [{ itemName: '', description: '', price: '' }],
  });
  const [menuItems,setMenuItems] = useState([])
  const [currentMenu,setCurrentMenu] = useState([])
   const [isNavOpen, setIsNavOpen] = useState(false)

  console.log('currentMenu:',currentMenu);
  

  console.log(menuItems);
  

  useEffect(() => {
    getAllMenuItems();
  }, []);

  const getAllMenuItems = async ()=>{
    try {
      const result = await getAllMenuAPI()
      console.log(result);
      if (result.status==200) {
        setMenuItems(result.data)
      }
    } catch (err) {
      console.log(err);
    }
  }


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;
    if (name === 'menuName') {
      setMenuData((prevData) => ({ ...prevData, [name]: value }));
    } else {
      setMenuData((prevData) => {
        const newMenuItems = [...prevData.menuItems];
        newMenuItems[index][name] = value;
        return { ...prevData, menuItems: newMenuItems };
      });
    }
  };

  const addItem = () => {
    setMenuData((prevData) => ({
      ...prevData,
      menuItems: [...prevData.menuItems, { itemName: '', description: '', price: '' }],
    }));
  };

  const removeItem = (index) => {
    setMenuData((prevData) => ({
      ...prevData,
      menuItems: prevData.menuItems.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await addMenuAPI(menuData);
      console.log('Menu added successfully:', response);
      closeModal();
      setMenuData({
        menuName: '',
        menuItems: [{ itemName: '', description: '', price: '' }],
      });
    } catch (error) {
      console.error('Error adding menu:', error);
      alert('Failed to add menu.');
    }
  };

  const handleMenuClick = (menu) => {
    setCurrentMenu(menu); 
  };

  return (
    <>
      <div id='main' className=''>
         {/* Header/Navbar */}
      <div className="header d-flex justify-content-between align-items-center px-5" style={{ height: '100px', backgroundColor: '#121618' }}>
        
        {/* Logo */}
        <div>
          <img width={150} src={logo} alt="Logo" />
        </div>

        <button 
          className="d-md-none text-white border-0 bg-transparent fs-1" 
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          ☰
        </button>

        <div className="d-none d-md-block" style={{ width: '30%' }}>
          <ul className="nav list-unstyled d-flex justify-content-between align-items-end">
            <li>HOME</li>
            <li>MENU</li>
            <li>MAKE A RESERVATION</li>
            <li>CONTACT US</li>
          </ul>
        </div>
      </div>
      <div 
        className={`mobile-menu d-md-none ${isNavOpen ? "d-block" : "d-none"}`} 
        style={{
          position: "absolute",
          top: "100px",
          right: 0,
          width: "200px",
          backgroundColor: "#121618",
          padding: "15px",
          boxShadow: "0px 5px 10px rgba(0,0,0,0.2)",
          transition: "0.3s ease-in-out",
          zIndex: 100
        }}
      >
        <ul className="list-unstyled text-white">
          <li className="py-2" onClick={() => setIsNavOpen(false)}>HOME</li>
          <li className="py-2" onClick={() => setIsNavOpen(false)}>MENU</li>
          <li className="py-2" onClick={() => setIsNavOpen(false)}>MAKE A RESERVATION</li>
          <li className="py-2" onClick={() => setIsNavOpen(false)}>CONTACT US</li>
        </ul>
      </div>
        {/* main */}
        <div id="main" className='d-flex justify-content-center align-items-center text-white' style={{height:'311px', backgroundImage: `url(${bgImage1})`, backgroundSize: 'cover', backgroundPosition: 'top', position:'relative'}}>


          {/* black shade */}
          <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',}}></div>


          <div className='text-center' style={{width: '55%',zIndex:'2'}}>
            <h1>MENU</h1>
            <p>Please take a look at our menu featuring food, drinks, and brunch. If you'd like to place an order, use the "Order Online" button located below the menu.</p>
          </div>
        </div>
        {/* option */}
        <div id="menu" className='text-white' style={{ height: '79px', backgroundImage: `url(${leafDesign})`, position: 'relative' }}>
          {/* black shade */}
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.8)' }}></div>
          <div className='buttons d-flex justify-content-center align-items-center' style={{ height: '100%' }}>
            {
              menuItems.map(item =>(
                <div key={item._id} className="round-button" style={{ width: '100px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '0.5px solid #007bff', color: 'white', fontWeight: 'bold', cursor: 'pointer', margin: '0 10px', backgroundColor: 'black', zIndex: '3' }} onClick={() => handleMenuClick(item)}>{item.menuName?.split(" ")[0]}</div>
              ))
              }

            <button className="round-button" style={{ width: '100px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: '0.5px solid #007bff', color: 'white', fontWeight: 'bold', cursor: 'pointer', margin: '0 10px', backgroundColor: 'black', zIndex: '3' }} onClick={openModal}>
              ADD MENU
            </button>          
            </div>
        </div>
        {/* display section */}
        <div id="items" className='d-flex justify-content-center align-items-center' style={{height:'672px', backgroundImage: `url(${bgImage2})`, backgroundSize: 'cover', backgroundPosition: 'top' , position:'relative'}}>
          {/* black shade */}
          <div 
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            }}
          ></div>

          <div style={{zIndex:'2', position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)'}}><img src={leftDesign} alt="" /></div> 
          <div style={{width:'79%', zIndex:'2'}}>
          <div className='p-5' style={{border: '1px solid #FFFFFF', height:'450px', position: 'relative'}}>
              <img 
              className='side-image'
                height={"230px"} 
                src={orangejuice} 
                alt="" 
                style={{ position: 'absolute', top: '-100px', left: '-45px' }} 
              />
              {
                 currentMenu.length===0 ?(
                  <div 
                    className="d-flex justify-content-center align-items-center text-center p-4 rounded shadow-lg" 
                    style={{
                      backgroundColor: "#f8f9fa",
                      color: "#343a40",
                      fontSize: "20px",
                      fontWeight: "bold",
                      width: "100%",
                      height: "100px",
                      maxWidth: "600px",
                      margin: "20px auto",
                      border: "1px solid #ddd"
                    }}
                  >
                    Click on the menu to Show items
                  </div>
                 )
                 :
                 (
                  <div>
                <div className='text-center text-white'>
                  <h2>---{currentMenu.menuName}---</h2>
                </div>
                <div className="row row-cols-1 row-cols-md-2 text-white pt-2 pt-md-3">
                  {
                    currentMenu.menuItems.map(item =>(
                      <div key={item?._id} className="col mb-3">
                    <h4>{item?.itemName}............${item?.price}</h4>
                    <p className="desc">
                      {item?.description}
                    </p>
                  </div>
                    )
                  )
                  }
                </div>
              </div>
                )
                
              }
              <img 
              className='side-image'
                height={"300px"} 
                src={cocktail} 
                alt="" 
                style={{ position: 'absolute', bottom: '-50px', right: '-5px' }} 
              />
          </div>
          </div>
          <div style={{zIndex:'2', position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)'}}><img src={rightDesign} alt="" /></div>
        </div>
        {/* footer */}
        <div id="footer" className="footer-container">
        {/* Top Section */}
        <div className="footer-content">
          {/* Connect With Us */}
          <div className="footer-box">
            <h5>CONNECT WITH US</h5>
            <p><span role="img" aria-label="phone">📞</span> +91 9567843340</p>
            <p><span role="img" aria-label="email">📧</span> info@deepnetsoft.com</p>
          </div>

          {/* Logo Box */}
          <div className="footer-box">
            <img src={logo} alt="Deep Net Soft Logo" className="footer-logo" />
          </div>

          {/* Find Us */}
          <div className="footer-box">
            <h5>FIND US</h5>
            <p><span role="img" aria-label="location">📍</span> First Floor, Geo Infopark, Infopark EXPY, Kakkanad</p>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="footer-bottom pt-4">
          <p>© 2024 Deepnetsoft Solutions. All rights reserved.</p>
          <div className="footer-links">
            <a href="/terms">Terms & Conditions</a>
            <a href="/privacy">Privacy Policy</a>
          </div>
        </div>
      </div>
      </div>
      {/* modal */}
      {isModalOpen && (
          <div 
            className="modal-overlay"
            onClick={closeModal} style={{zIndex:'4'}}
          >
            <div 
              className="modal-content"
              onClick={(e) => e.stopPropagation()} 
            >
              <h6 className="modal-title">Add New Menu</h6>
        
              {/* Menu Name Input */}
              <input 
                type="text" 
                name="menuName" 
                placeholder="Menu Name" 
                value={menuData.menuName} 
                onChange={handleInputChange} 
                className="input-field"
              />
        
              {/* Menu Items */}
              <div className="menu-items">
                {menuData.menuItems.map((item, index) => (
                  <div key={index} className="menu-item">
                    <input 
                      type="text" 
                      name="itemName" 
                      placeholder={`Item Name ${index + 1}`} 
                      value={item.itemName} 
                      onChange={(e) => handleInputChange(e, index)} 
                      className="input-field"
                    />
                    <textarea 
                      name="description" 
                      placeholder={`Item Description ${index + 1}`} 
                      value={item.description} 
                      onChange={(e) => handleInputChange(e, index)} 
                      className="input-field"
                    />
                    <input 
                      type="number" 
                      name="price" 
                      placeholder={`Price ${index + 1}`} 
                      value={item.price} 
                      onChange={(e) => handleInputChange(e, index)} 
                      className="input-field"
                    />
                    <button className="remove-btn" onClick={() => removeItem(index)}>Remove</button>
                  </div>
                ))}
              </div>
        
              {/* Buttons */}
              <div className="modal-buttons">
                <button className="add-btn" onClick={addItem}>+ Add Item</button>
                <button className="submit-btn" onClick={handleSubmit}>Submit</button>
                <button className="cancel-btn" onClick={closeModal}>Cancel</button>
              </div>
            </div>
          </div>       
      )}
    </>
  )
}

export default App
