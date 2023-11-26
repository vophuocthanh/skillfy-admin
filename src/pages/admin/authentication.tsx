import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/Table'

const INVOICES = [
  {
    id: 1,
    title: 'Item 1',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    quality: 5,
    price: '$1200',
    totals: '$2.888.00'
  },
  {
    id: 2,
    title: 'Item 2',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    quality: 5,
    price: '$1200',
    totals: '$2.888.00'
  },
  {
    id: 3,
    title: 'Item 3',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    quality: 5,
    price: '$1200',
    totals: '$2.888.00'
  },
  {
    id: 4,
    title: 'Item 4',
    desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    quality: 5,
    price: '$1200',
    totals: '$2.888.00'
  },
  {
    id: 5,
    title: 'Totals',
    totals: '$2.888.00'
  },
  {
    id: 6,
    title: 'Taxs',
    totals: '$2.888.00'
  },
  {
    id: 7,
    title: 'Discount',
    totals: '$2.888.00'
  }
]

function Authentication() {
  return (
    <>
      <div className="bg-blue-500 pt-14 pb-20 px-10 rounded-bl-2xl rounded-br-2xl">
        <div className="flex flex-col">
          <h1 className="text-4xl font-bold text-white">Hello Devs !</h1>
          <p className="text-2xl text-white">
            We are on a mission to help developers like you to build beautiful
            projects for free.
          </p>
        </div>
      </div>
      <div className="px-10 -mt-10">
        <div className="bg-white p-6 rounded-lg shadow pb-8 mb-3 h-full mx-auto">
          <div className="flex justify-between">
            <h1 className="mt-10 mb-4 text-3xl font-bold">Invoice #215462</h1>
            <span className="mt-10 leading-7">DUE DATE: Aug 19, 2022</span>
          </div>
          <h1 className="mb-8 text-3xl font-bold">Hello , Devon Lane </h1>
          <p className="leading-7 text-zinc-950">
            It is a long established fact that a reader will be distracted by
            the readable content of a page when looking at its layout. The point
            of using Lorem Ipsum is that it has a more-or-less normal
            distribution of letters, as opposed to using 'Content here, content
            here', making it look like readable English.
          </p>
          <Table className="mt-14">
            <TableHeader>
              <TableRow>
                <TableHead>Items</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Price</TableHead>
                <TableHead className="text-right">Totals</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {INVOICES.map(invoice => (
                <TableRow key={invoice.id}>
                  <TableCell>
                    <p>{invoice.title}</p>
                    <span>{invoice.desc}</span>
                  </TableCell>
                  <TableCell>{invoice.quality}</TableCell>
                  <TableCell>{invoice.price}</TableCell>
                  <TableCell className="text-right">{invoice.totals}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  )
}

export default Authentication
