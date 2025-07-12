import {
  Html,
  Body,
  Container,
  Heading,
  Hr,
  Section,
  Text,
} from "@react-email/components";
import { Product } from "@/components/ProductsPage/ProductsFeed/ProductsFeed";

interface OrderItem extends Product {
  quantity: number;
}

export default function OrderConfirmationEmail({
  customerName,
  orderId,
  items,
  total,
}: {
  customerName: string;
  orderId: string;
  items: OrderItem[];
  total: number;
}) {
  return (
    <Html>
      <Body
        style={{
          background: "#faf8f5",
          fontFamily: "'Helvetica Neue', Arial, sans-serif",
          lineHeight: 1.6,
          color: "#1f1f1f",
          padding: "20px 0",
        }}
      >
        <Container
          style={{
            maxWidth: "580px",
            margin: "0 auto",
            padding: "24px",
            background: "#fff",
            borderRadius: "8px",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
            border: "1px solid #e0dfdc",
          }}
        >
          <Heading
            style={{
              color: "#ff6f00",
              fontSize: "24px",
              marginBottom: "16px",
              fontWeight: "600",
            }}
          >
            Thanks for your purchase, {customerName}!
          </Heading>

          <Text
            style={{
              fontSize: "16px",
              marginBottom: "24px",
            }}
          >
            Your order <strong style={{ color: "#1f1f1f" }}>#{orderId}</strong>{" "}
            has been received.
          </Text>

          <Hr
            style={{
              border: "none",
              borderTop: "1px solid #e0dfdc",
              margin: "24px 0",
            }}
          />

          <Section style={{ marginBottom: "24px" }}>
            {items.map((i) => (
              <Text
                key={i.id}
                style={{
                  fontSize: "15px",
                  marginBottom: "12px",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <span>
                  {i.title} ×{i.quantity}
                </span>
                <span style={{ fontWeight: "600" }}>
                  ${(i.price * i.quantity).toFixed(2)}
                </span>
              </Text>
            ))}
          </Section>

          <Hr
            style={{
              border: "none",
              borderTop: "1px solid #e0dfdc",
              margin: "24px 0",
            }}
          />

          <Text style={{ fontSize: "16px" }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "12px",
                fontWeight: "600",
              }}
            >
              <span>Total:</span>
              <span>${total.toFixed(2)}</span>
            </div>
            <div
              style={{
                color: "#595959",
                marginTop: "16px",
                fontSize: "15px",
              }}
            >
              We&apos;ll ship your order soon. 🛒
            </div>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
