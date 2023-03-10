import ContentLoader, { Code, List } from 'react-content-loader';

const LoadingSkeleton = () => {
  return (
    <div className="h-screen py-2 px-4 bg-zinc-700 grid grid-cols-[3fr_5fr_12fr] overflow-hidden">
      <div className="flex flex-col gap-4">
        <ContentLoader
          height={80}
          width={180}
          speed={1}
          backgroundColor={'#333'}
          foregroundColor={'#999'}
          viewBox="0 0 300 70"
        ></ContentLoader>
        <div className="flex flex-col gap-2">
          <ContentLoader
            height={30}
            className="h-fit"
            speed={1}
            backgroundColor={'#333'}
            foregroundColor={'#999'}
          >
            <rect x="0" y="0" rx="5" ry="5" width="200" height="30" />
          </ContentLoader>
          <ContentLoader
            height={30}
            speed={1}
            backgroundColor={'#333'}
            foregroundColor={'#999'}
          >
            <rect x="0" y="0" rx="5" ry="5" width="200" height="30" />
          </ContentLoader>
        </div>
      </div>
      <div className="flex flex-col gap-8 mt-8 h-screen">
        <Code
          height={80}
          speed={1}
          backgroundColor={'#333'}
          foregroundColor={'#999'}
          viewBox="0 0 380 70"
        />
        <List
          height={80}
          speed={1}
          backgroundColor={'#333'}
          foregroundColor={'#999'}
          viewBox="0 0 380 70"
        />
        <Code
          height={80}
          speed={1}
          backgroundColor={'#333'}
          foregroundColor={'#999'}
          viewBox="0 0 380 70"
        />
        <List
          height={80}
          speed={1}
          backgroundColor={'#333'}
          foregroundColor={'#999'}
          viewBox="0 0 380 70"
        />
        <Code
          height={80}
          speed={1}
          backgroundColor={'#333'}
          foregroundColor={'#999'}
          viewBox="0 0 380 70"
        />
        <List
          height={80}
          speed={1}
          backgroundColor={'#333'}
          foregroundColor={'#999'}
          viewBox="0 0 380 70"
        />
      </div>
      <div className="flex items-center justify-center">
        <ContentLoader
          height={300}
          speed={1}
          backgroundColor={'#333'}
          foregroundColor={'#999'}
        >
          <rect x="0" y="0" rx="5" ry="5" width="300" height="300" />
        </ContentLoader>
      </div>
    </div>
  );
};

export { LoadingSkeleton };
