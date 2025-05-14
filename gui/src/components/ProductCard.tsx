'use client';
type Props = {
  name: string;
  code: string;
  price: number;
  onAdd: (code: string) => void;
};

export default function ProductCard({ name, code, price, onAdd }: Props) {
    console.log('details are::',name,code,price)
  return (
    <div className="border p-4 rounded shadow">
      <h2 className="font-bold">{name}</h2>
      <p>Code: {code}</p>
      <p className="text-lg font-bold">${price}</p>
      <button onClick={() => onAdd(code)} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
        Add to Cart
      </button>
    </div>
  );
}
