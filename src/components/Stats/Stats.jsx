import styles from './Stats.module.scss'
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

function Stats(props) {
  const locale = "fi-FI"
  const numberFormat = new Intl.NumberFormat(locale, { style: 'currency', currency: 'EUR' })

  // Lisää reduce-funktion yhdistämään samalle päivälle osuvat maksut
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
    </div>
  )
}

export default Stats
