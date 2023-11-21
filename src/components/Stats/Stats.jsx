import styles from './Stats.module.scss'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { LabelList, Legend, Pie, PieChart } from 'recharts'

function Stats(props) {
  const locale = "fi-FI"
  const numberFormat = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' })

  // Aikajanassa lisää reduce-funktion yhdistämään samalle päivälle osuvat maksut
  const linedata = props.data.reduce((result, item) => {
    const date = new Date(item.paymentDate).getTime();
    const existItem = result.find((r) => r.date === date);
    // Jos olemassa yhdistetään maksut
    if (existItem) {
      existItem.totalPrice += item.totalPrice;
    } else {
      result.push({ date, totalPrice: item.totalPrice });
    }
    return result;
  }, []);

  // Ympyräkaavion esittely
    const reducer = (resultData, item) => {
    // Selvitetään löytyykö käsittelyn alla olevan alkion operaattori
    // jo tulostaulukosta.
    const index = resultData.findIndex(arrayItem => arrayItem.operator === item.operator)
    if (index >= 0) {
      // Operaattori löytyy tulostaulukosta, kasvatetaan kokonaissummaa.
      resultData[index].totalPrice = resultData[index].totalPrice + item.totalPrice
    } else {
      // Operaattoria ei löytynyt tulostaulukosta, lisätään se sinne.
      resultData.push({operator: item.operator, totalPrice: item.totalPrice})
    }
    // Palautetaan tulostaulukko.
    return resultData
  }

  const piedata = props.data.reduce(reducer, [])

  return (
    <div className={styles.stats}>
      <div className={styles.centerText}>
        <h2>Tilastot</h2>
      </div>
      <h3>Kulut aikajanalla</h3>
      <ResponsiveContainer height={350}>
        <LineChart data={linedata}>
          <Line dataKey='totalPrice' />
          <XAxis type='number'  
                 dataKey='date' 
                 domain={['dataMin','dataMax']}
                 tickFormatter={
                  value => new Date(value).toLocaleDateString(locale)
                 } />
          <YAxis />
          <Tooltip labelFormatter={
                      value => new Date(value).toLocaleDateString(locale)
                   }
                   formatter={
                     value => [numberFormat.format(value),"maksettu",]
                   } />
        </LineChart>
      </ResponsiveContainer>
      <h3>Kulut operaattoreittain</h3>
      <ResponsiveContainer height={350}>
        <PieChart>
          <Pie data={piedata} dataKey='totalPrice' nameKey='operator'>
            <LabelList dataKey='totalPrice'
                       position='inside'
                       formatter={
                        value => numberFormat.format(value)
                       } />
          </Pie>
          <Legend />
          <Tooltip formatter={ value => numberFormat.format(value) } />
        </PieChart>
      </ResponsiveContainer>   
    </div>
  )
}

export default Stats
