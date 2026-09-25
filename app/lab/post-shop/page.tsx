import Image from "next/image";
import Link from "next/link";
import { envelopePhotos, seals } from "@/lib/postShop";

export default function PostShopPage() {
  return (
    <div className="psx">
      <header className="psx-bar">
        <Link href="/#lab" className="psx-back" aria-label="Back to the lab">
          <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false">
            <path
              d="M7.5 1.5 3 6l4.5 4.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
        <h1 className="psx-title">the post shop</h1>
      </header>

      <div className="psx-seal-stage psx-seal-stage--wide">
        {envelopePhotos.map((envelope) => (
          <figure key={envelope.id} className="psx-seal psx-seal--envelope">
            <Image
              src={envelope.art}
              alt={`${envelope.label} envelope`}
              width={envelope.width}
              height={envelope.height}
              priority
            />
            <figcaption>{envelope.label}</figcaption>
          </figure>
        ))}
      </div>

      <div className="psx-seal-stage">
        {seals.map((seal) => (
          <figure key={seal.id} className="psx-seal">
            <Image
              src={seal.art}
              alt={`${seal.label} wax seal`}
              width={seal.width}
              height={seal.height}
              priority
            />
            <figcaption>{seal.label}</figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}
