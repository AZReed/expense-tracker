import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PaginationControlsProps {
  data?: {
    currentPage: number;
    nextPage: boolean;
    previousPage: boolean;
  };
  onPaginationChange: (page: number | undefined) => void;
}

const PaginationControls: React.FC<PaginationControlsProps> = ({ data, onPaginationChange }) => {
  const prevPage = data?.previousPage ? `?page=${data?.currentPage - 1}` : null
  const currentPage = (data?.currentPage || 0)
  const nextPage = data?.nextPage ? `?page=${data?.currentPage + 1}` : null

  return (
    <>
      {!prevPage && !nextPage ? null : (
        <Pagination>
          <PaginationContent>
            {prevPage && (
              <PaginationItem>
                <PaginationPrevious onPaginationChange={onPaginationChange} href={prevPage} />
              </PaginationItem>
            )}
            <PaginationItem>
              <PaginationLink href="#">{currentPage}</PaginationLink>
            </PaginationItem>
            {nextPage && (
              <PaginationItem>
                <PaginationNext onPaginationChange={onPaginationChange} href={nextPage} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
}

export default PaginationControls;