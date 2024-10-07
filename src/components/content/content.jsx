import { useState, useEffect } from 'react';
import Sorting from '../../utils/sorting';

import './content.scss';

function Content({time}) {
  const [isPopup, setIsPopup] = useState(false)
  const [dataDiscount, setDataDiscount] = useState([])
  const [dataSales, setDataSales] = useState([])
  const [dataNotSales, setDataNotSales] = useState([])

  const dopDataSale = [
    {sale: -30, slogan: "Чтобы просто начать 👍🏻"},
    {sale: -40, slogan: "Привести тело впорядок 💪🏻"},
    {sale: -50, slogan: "Изменить образ жизни 🔥"},
    {sale: -70, slogan: "Всегда быть в форме и поддерживать своё здоровье ⭐️"},
  ]

  useEffect(() => {
    fetch('https://t-pay.iqfit.app/subscribe/list-test', {
      method: 'GET'
    }).then(response => response.json()).then(data => {
      const sorting = new Sorting(data)
      const result = sorting.process()
      setDataDiscount(result.discount)
      setDataSales(result.sales)
      setDataNotSales(result.notSales)
    })
  }, [])

  useEffect(() => {
    if(time === 0) {
      setIsPopup(true)
    }
  }, [time])

  const close = () => {
    console.log('here')
    setIsPopup(false)
  }

  return (
    <div className='contentWrapper'>
      {time === 0 && isPopup === true ?
        <>
          <div className='popupWrapper'>
            <h2>Не упусти свой последний шанс</h2>
            <p>Мы знаем, как трудно начать.. Поэтому!</p>
            <b>В этот popup такие же практически стили и функции как и на основной странице</b>
            <div className='wrapperCard'>
              {dataDiscount.map(item => (
                <div className='Card'key={item.id}>
                  <p className='CardName'>{item.name}</p>
                  <p className='CardPrice'>{item.price}₽</p>
                </div>
              ))

              }
            </div>
            <button className='btn'>Начать тренироваться</button>
          </div>
          <div className='backgroundDark' onClick={() => setIsPopup(false)}></div>        
        </> : null
      }
      <h1>Выберите подходящий тарифный план</h1>
      <main className='wrapperMainContent'>
        <div className='backgroundImage' />
        <div>
          <div className='wrapperCard'>
            {dataSales.map((item, index) => (
              <div className='Card'key={item.id}>
                {time !== 0 && isPopup !== true ?
                  <div className='wrapperSale'>{dopDataSale[index].sale}%</div>: null
                }
                <p className='CardName'>{item.name}</p>
                <div className='wrapperPrice'>
                  <p className='CardPrice'>{time !== 0 && isPopup !== true ? item.price: dataNotSales[index].price}₽</p>
                  {time !== 0 && isPopup !== true ?
                    <p className='CardNotSale'>{ dataNotSales[index].price}₽</p>: null
                  }
                  
                </div>
                <div style={{width: '80%'}}>
                  <p className='CardSlogan'>{dopDataSale[index].slogan}</p>
                </div>
                
              </div>
            ))}
          </div>
          <p className='textDefault'>Следуя плану на 3 месяца, люди получают в 2 раза лучший результат, чем за 1 месяц</p>
          <div className='wrapperCheckbox'>
            <input type="checkbox" id="checkbox1" />
            <label htmlFor="checkbox1" className='lightText'>Я соглашаюсь с <span style={{color: '#2D97F9'}}>Правилами сервиса</span> и  условиями <span style={{color: '#2D97F9'}}>Публичной оферты.</span></label>
          </div>
          <button className='btn'>Купить</button>
          <p className='lightText textHide'>Нажимая «Купить», Пользователь соглашается на автоматическое списание денежных средств по истечению купленного периода. Дальнейшие списания по тарифам участвующим в акции осуществляются по полной стоимости согласно оферте.</p>
        </div>
      </main>
    </div>
  );
}

export default Content;
