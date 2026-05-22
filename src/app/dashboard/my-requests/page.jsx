import { auth } from "@/lib/auth";
import { headers } from "next/headers";

import RequestCard from "@/components/RequestCard";

const MyRequestsPage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;

  const { token } = await auth.api.getToken({
    headers: await headers(),
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/adoption?email=${user?.email}`,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();

  const requests = Array.isArray(data)
    ? data
    : [];

  return (
    <div className="max-w-7xl mx-auto px-5 py-10">
      <h1 className="text-4xl font-bold mb-10">
        My Adoption Requests
      </h1>

      <div className="space-y-5">
        {requests.map((request) => (
          <RequestCard
            key={request._id}
            request={request}
          />
        ))}
      </div>
    </div>
  );
};

export default MyRequestsPage;