import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";
import Image from "next/image";
import { toDataURL } from "qrcode";

const generateQR = async (text: string) => {
  return await toDataURL(text, { scale: 20 });
};

export default async function QRCode({
  params,
}: {
  params: { healthCard: string };
}) {
  const url = `http://192.168.1.144:3000/records/view/${params.healthCard}/personal`;
  const QRCodeSrc = await generateQR(url);
  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code</CardTitle>
      </CardHeader>
      <CardContent className="grid items-center justify-center">
        <Image width={310} height={310} alt="QR Code" src={QRCodeSrc} />
      </CardContent>
    </Card>
  );
}
