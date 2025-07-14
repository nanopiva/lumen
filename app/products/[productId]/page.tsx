import getProductById from "@/lib/actions/getProductById";
import { notFound } from "next/navigation";
import ProductDetailed from "../../../components/ProductsPage/ProductDetailed/ProductDetailed";
import styles from "./page.module.css";

type Props = {
  params: Promise<{
    productId: string;
  }>;
};

export default async function ProductPage({ params }: Props) {
  // Await the params promise
  const { productId } = await params;

  const product = await getProductById(productId);

  if (!product || product.is_deleted) {
    return notFound();
  }

  return (
    <div className={styles.productPage}>
      <ProductDetailed product={product} />
    </div>
  );
}
