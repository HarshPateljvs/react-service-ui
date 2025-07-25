import {
  DataGridPro as DataGrid,
  GridToolbar,
  type GridColDef,
  type GridRenderCellParams,
  type GridRowModel,
  type GridSortModel,
} from "@mui/x-data-grid-pro";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";

import { AVTUseEffect, AVTUseState } from "../../customHooks";
import { API } from "../../services/API/api";
import CommonButton from "./CommonButton";


type CommonInfiniteGridProps<T> = {
  apiUrl: string;
  updateUrl?: string;
  deleteUrl?: string;
  showEdit?: boolean;
  showDelete?: boolean;
  onEditClick?: (row: T) => void;
  onDeleteClick?: (row: T) => void;
  onAddClick?: () => void;
  reloadTrigger?: number;
};

function CommonInfiniteGrid<
  T extends { Id?: number | string; id?: number | string }
>({
  apiUrl,
  updateUrl,
  deleteUrl,
  showEdit = false,
  showDelete = false,
  onEditClick,
  onAddClick,
  reloadTrigger,
}: CommonInfiniteGridProps<T>) {
  const [rows, setRows] = AVTUseState<T[]>("InfiniteGrid-rows", []);
  const [columns, setColumns] = AVTUseState<GridColDef[]>(
    "InfiniteGrid-cols",
    []
  );
  const [page, setPage] = AVTUseState<number>("InfiniteGrid-page", 0);
  const [pageSize] = AVTUseState<number>("InfiniteGrid-pageSize", 10); // fixed chunk size
  const [loading, setLoading] = AVTUseState<boolean>(
    "InfiniteGrid-loading",
    false
  );
  const [totalCount, setTotalCount] = AVTUseState<number>(
    "InfiniteGrid-totalCount",
    0
  );
  const [queryOptions, setQueryOptions] = AVTUseState("queryOptions", {});
  const sortModel = (queryOptions as { sortModel?: GridSortModel })?.sortModel;
  const [quickFilterText, setQuickFilterText] = AVTUseState<string>(
    "InfiniteGrid-quickFilter",
    ""
  );
  const [hasLoadedOnce, setHasLoadedOnce] = AVTUseState<boolean>(
    "InfiniteGrid-hasLoadedOnce",
    false
  );
  const [shouldReload, setShouldReload] = AVTUseState<boolean>(
    "InfiniteGrid-shouldReload",
    false
  );
  const isAllDataLoaded = hasLoadedOnce && rows.length >= totalCount;

  const loadData = async (append = false) => {
    if (loading || isAllDataLoaded) return;
    setLoading(true);

    try {
      const filter: FilterDto = {
        PageNo: page + 1,
        PageSize: pageSize,
        Predicates: {},
        SearchText: quickFilterText,
        SortModels: sortModel
          ?.filter((s) => s.sort === "asc" || s.sort === "desc")
          .map((sort) => ({
            Field: sort.field,
            Sort: sort.sort as "asc" | "desc",
          })),
      };

      const response = await API.POST_FULL<T[]>(apiUrl, filter);
      const fetchedData = response.Data ?? [];
      setRows((prev) => (append ? [...prev, ...fetchedData] : fetchedData));
      setTotalCount(response.TotalCount || 0);
      setHasLoadedOnce(true);
      const firstRow = [...rows, ...fetchedData][0] || {};
      if (columns.length === 0) {
        // const generatedColumns: GridColDef[] = [
        //   {
        //     field: "serialNo",
        //     headerName: "No.",
        //     width: 80,
        //     align: "center",
        //     headerAlign: "center",
        //     sortable: false,
        //     filterable: false,
        //     renderCell: (params) => {
        //       const allRowIds = params.api.getAllRowIds() as (
        //         | number
        //         | string
        //       )[];
        //       const index = allRowIds.indexOf(params.id);
        //       return index !== -1 ? (index + 1).toString() : "";
        //     },
        //   },
        //   ...Object.keys(firstRow).map((key) => ({
        //     field: key,
        //     headerName: key,
        //     flex: 1,
        //   })),
        // ];
const generatedColumns: GridColDef[] = Object.keys(firstRow).map((key) => {
  // ✅ Handle EmployeeImages column with image thumbnails
  if (key === "EmployeeImages") {
    return {
      field: key,
      headerName: "Images",
      flex: 2,
      sortable: false,
      filterable: false,
      renderCell: (params: GridRenderCellParams<T>) => {
        const imageInfoRequest = params.value as ImageInfoRequest;
        const images = imageInfoRequest?.AddImages ?? [];

        if (!images.length) return <span>No Images</span>;

        return (
          <div style={{ display: "flex", gap: 6, overflowX: "auto" }}>
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img.ImageName}
                alt={`img-${idx}`}
                style={{
                  width: "60px",
                  height: "60px",
                  objectFit: "cover",
                  borderRadius: "6px",
                  border: "1px solid #ddd",
                }}
              />
            ))}
          </div>
        );
      },
    };
  }

  // ✅ Default column render
  return {
    field: key,
    headerName: key,
    flex: 1,
    editable: true,
  };
});

        if (showEdit || showDelete) {
          generatedColumns.push({
            field: "actions",
            headerName: "Actions",
            width: 120,
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams<T>) => (
              <>
                {showEdit && (
                  <IconButton onClick={() => onEditClick?.(params.row)}>
                    <EditIcon color="primary" />
                  </IconButton>
                )}
                {showDelete && (
                  <IconButton
                    onClick={() => {
                      if (window.confirm("Are you sure to delete?")) {
                        handleDelete(params.row);
                      }
                    }}
                  >
                    <DeleteIcon color="error" />
                  </IconButton>
                )}
              </>
            ),
          });
        }

        setColumns(generatedColumns);
      }
    } catch (err) {
      console.error("InfiniteGrid load error:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (row: T) => {
    const id = row.Id ?? row.id;
    if (!id || !deleteUrl) return;

    try {
      await API.DELETE(`${deleteUrl}/${id}`);
      setRows((prev) => prev.filter((r) => (r.Id ?? r.id) !== id));
    } catch (err) {
      console.error("Delete failed:", err);
    }
  };

  const processRowUpdate = async (updatedRow: GridRowModel) => {
    if (!updateUrl) return updatedRow;

    try {
      await API.PUT(updateUrl, updatedRow);
      return updatedRow;
    } catch (err) {
      console.error("Update failed", err);
      throw err;
    }
  };

  AVTUseEffect(
    "InfiniteGrid-initial-load",
    () => {
      setRows([]);
      setPage(0);
      setTotalCount(0);
      setHasLoadedOnce(false);
      setShouldReload(true);
    },
    [quickFilterText, reloadTrigger, sortModel]
  );
  AVTUseEffect(
    "InfiniteGrid-perform-reload",
    () => {
      if (shouldReload) {
        loadData(false);
        setShouldReload(false);
      }
    },
    [shouldReload]
  );
  const handleScrollEnd = () => {
    if (!isAllDataLoaded && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  AVTUseEffect(
    "InfiniteGrid-loadMore",
    () => {
      if (page > 0) loadData(true);
    },
    [page]
  );
  const handleSortModelChange = React.useCallback(
    (sortModel: GridSortModel) => {
      setQueryOptions({ sortModel });
    },
    []
  );
  return (
    <div style={{ height: 600, width: "100%" }} className="relative mb-2">
      {onAddClick && (
        <div className="absolute top-0 right-0 z-10">
          <CommonButton onClick={onAddClick} className="text-sm px-3 py-1">
            + Add
          </CommonButton>
        </div>
      )}

      <div className="h-full pt-14">
        <DataGrid
          rows={rows}
          columns={columns}
          rowCount={totalCount}
          loading={loading}
          paginationMode="server"
          sortingMode="server"
          getRowId={(row) => row.Id ?? row.id}
          onSortModelChange={handleSortModelChange}
          onRowsScrollEnd={handleScrollEnd}
          slots={{ toolbar: GridToolbar }}
          slotProps={{
            toolbar: {
              showQuickFilter: true,
              quickFilterProps: { debounceMs: 500 },
              onChange: (event: React.ChangeEvent<HTMLInputElement>) => {
                setQuickFilterText(event.target.value);
                setPage(0);
              },
            },
          }}
          showToolbar
          processRowUpdate={processRowUpdate}
        />
      </div>
    </div>
  );
}

export default CommonInfiniteGrid;
