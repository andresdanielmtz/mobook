import { getBooksById } from "@/api/getBooks";
import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/loading";
import type { Item } from "@/model";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Markup } from "interweave";

const Details = () => {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = React.useState<Item | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<Error | null>(null);

  useEffect(() => {
    if (!id) {
      console.error("ID is undefined");
      return;
    }
    const fetchData = async () => {
      console.log(`Complete URL: ${import.meta.env.VITE_BOOK_API_URL2}/${id}`);
      try {
        const response = await getBooksById(id);

        setData(response);
      } catch (error: unknown) {
        console.error("Error fetching data:", error);
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1);
  };

  // Return loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }
  // Return error state
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data found</div>;
  }

  return (
    <div>
      <div className="flex justify-start align-bottom mt-5 ml-5 ">
        <Button onClick={handleBack}> Back</Button>
      </div>
      <div className="container mx-auto p-6">
        <div className="flex flex-row items-center justify-between align-middle">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-justify">
            {data.volumeInfo.title}
          </h1>
        </div>
        <div className="flex flex-col md:flex-row items-start">
          {data.volumeInfo.imageLinks?.thumbnail && (
            <img
              className="w-full md:w-1/3 rounded shadow-md mb-6 md:mb-0 md:mr-6"
              src={data.volumeInfo.imageLinks?.thumbnail}
              alt={data.volumeInfo.title}
            />
          )}
          <div className="flex-1 text-justify">
            <Markup content={data.volumeInfo.description} />

            <h3 className="text-xl font-semibold text-gray-800 mb-4  my-5">
              Authors
            </h3>
            <ul className="list-disc list-inside mb-6">
              {data.volumeInfo.authors?.map((author, index) => (
                <li key={index} className="text-gray-600">
                  {author}
                </li>
              ))}

              <h3 className="text-xl font-semibold text-gray-800 mb-4 my-5">
                {" "}
                Publisher
              </h3>
              <p className="text-gray-600 mb-6">{data.volumeInfo.publisher}</p>
              {data.volumeInfo.publishedDate ? (
                <h3 className="text-xl font-semibold text-gray-800 mb-4 my-5">
                  {" "}
                  Published Date: {data.volumeInfo.publishedDate}
                </h3>
              ) : (
                <h3 className="text-xl font-semibold text-gray-800 mb-4 my-5">
                  {" "}
                  Publish Date Unavailable
                </h3>
              )}

              <h3 className="text-xl font-semibold text-gray-800 mb-4 my-5">
                Categories
              </h3>
              <ul className="list-disc list-inside mb-6">
                {data.volumeInfo.categories?.map((category, index) => (
                  <li key={index} className="text-gray-600">
                    {category}
                  </li>
                ))}
              </ul>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
