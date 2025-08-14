import { memo, type FC } from 'react';
import type { IProduct } from '../../pages/home';

interface Props{
  data: IProduct[] | undefined
}

const ProductView:FC<Props> = ({data}) => {
  return (
    <div className="container mx-auto grid grid-cols-5 gap-3">
      {
        data?.map((product:IProduct) => (
          <div key={product.id} className='border border-gray-200 p-4'>
            <div>
              <img src={product.thumbnail} alt="" />
            </div>
            <div>
              <h3 className='line-clamp-1' title={product.title}>{product.title}</h3>
            </div>
          </div>
        ))
      }
    </div>
  );
};

export default memo(ProductView);