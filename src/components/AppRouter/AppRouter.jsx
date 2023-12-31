import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AddItem from '../AddItem'
import EditItem from '../EditItem'
import ErrorPage from '../ErrorPage'
import Items from '../Items'
import Root from '../Root'
import Settings from '../Settings'
import Stats from '../Stats'

/**
 * `AppRouter` vastaa sovelluksen reitityksen määrittämisestä käyttäen React Routeria.
 *
 * @component
 * @param {Object} props - Komponentille annetut ominaisuudet.
 * @param {Function} props.onItemSubmit - Funktio, joka käsittelee merkinnän lähettämisen.
 * @param {Function} props.onItemDelete - Funktio, joka käsittelee merkinnän poistamisen.
 * @param {Function} props.onOperatorSubmit - Funktio, joka käsittelee operaattorin lähettämisen.
 * @param {Object} props.user - Käyttäjän tiedot.
 * @param {Object} props.auth - Autentikointiobjekti.
 * @param {Array} props.operatorlist - Lista käytettävissä olevista operaattoreista.
 * @param {Array} props.data - Tieto sovelluksen tarvitsemasta datasta.
 * @returns {JsxElement} - Renderöity komponentti.
 *
 * @example
 * // Käyttö AppRouter-komponentin kanssa:
 * <AppRouter
 *   onItemSubmit={handleItemSubmit}
 *   onItemDelete={handleItemDelete}
 *   onOperatorSubmit={handleOperatorSubmit}
 *   user={currentUser}
 *   auth={authObject}
 *   operatorlist={operatorList}
 *   data={applicationData}
 * />
 */

function AppRouter(props) {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        { path: "",
         element: <Items />,
         loader: () => { return props.data } },
        { path: "add",
          element: <AddItem onItemSubmit={props.onItemSubmit}
                            operatorlist={props.operatorlist} /> },
        { path: "edit/:id",
          element: <EditItem onItemSubmit={props.onItemSubmit}
                             onItemDelete={props.onItemDelete}
                             operatorlist={props.operatorlist} />,
          loader: ({params}) => {
            const item = props.data.filter(item => item.id === params.id).shift()
            if (item) {
              return { item }
            } else {
              throw new Response("Not Found", { status: 404 })
            }
          } },
        { path: "stats", element: <Stats data={props.data} /> },
        { path: "settings",
          element: <Settings operatorlist={props.operatorlist}
                             onOperatorSubmit={props.onOperatorSubmit}
                             user={props.user}
                             auth={props.auth} /> }
      ]
    }
  ])

  return (
    <RouterProvider router={router} />
  )
}

export default AppRouter
