import { Input } from 'antd'
import UsersList from './UsersList'

export default function Index() {

  return (
    <>
      <section className='d-flex flex-column' style={{ height: '100vh' }}>
        <div className="container col-xl-9 flex-grow-1">
          <UsersList />
        </div>
        <footer className='w-100 py-3 bg-light'>
          <p className='mb-0 text-center' style={{ fontSize: '12px' }}>nhat200901@gmail.com</p>
        </footer>
      </section>
    </>
  )
}
