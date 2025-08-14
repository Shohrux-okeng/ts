import { memo, type FC } from "react";
import type { IProduct } from "../../types/product";

interface Props {
  data: IProduct[] | undefined;
}

const ProductView: FC<Props> = ({ data }) => {
  return (
    <div className="container mx-auto grid grid-cols-5 gap-3">
      {data?.map((product) => (
        <div
          key={product.id}
          className="border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
        >
          <div className="w-full h-40 overflow-hidden flex justify-center items-center bg-gray-50 rounded-md">
            <img
              src={product.thumbnail}
              alt={product.title}
              className="object-cover h-full w-full"
            />
          </div>
          <div className="mt-2">
            <h3
              className="line-clamp-1 text-gray-800 font-medium"
              title={product.title}
            >
              {product.title}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default memo(ProductView);
