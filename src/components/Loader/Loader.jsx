import { Oval } from 'react-loader-spinner';

export const Loader = () => {
  return (
    <Oval
      height={80}
      width={80}
      wrapperStyle={{ justifyContent: 'center' }}
      color="#4fa94d"
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={2}
      strokeWidthSecondary={2}
    />
  );
};

export const LoaderBtn = () => {
  return (
    <Oval
      height={10}
      width={10}
      wrapperStyle={{ justifyContent: 'center' }}
      color="#ffffff"
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={5}
      strokeWidthSecondary={10}
    />
  );
};
