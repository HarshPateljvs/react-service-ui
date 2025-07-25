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

import { AVTUseEffect, AVTUseState } from "../../customHooks";
import { API } from "../../services/API/api";
import CommonButton from "./CommonButton";
import React from "react";

type CommonGridProps<T> = {
  apiUrl: string;
  updateUrl?: string;
  deleteUrl?: string;
  data?: T[];
  showEdit?: boolean;
  showDelete?: boolean;
  onEditClick?: (row: T) => void;
  onDeleteClick?: (row: T) => void;
  onAddClick?: () => void;
  reloadTrigger?: number;
};

function CommonGrid<T extends { Id?: number | string; id?: number | string }>({
  apiUrl,
  updateUrl,
  deleteUrl,
  data,
  showEdit = false,
  showDelete = false,
  onEditClick,
  onAddClick,
  reloadTrigger,
}: CommonGridProps<T>) {
  const [rows, setRows] = AVTUseState<T[]>("CommonGrid-rows", []);
  const [columns, setColumns] = AVTUseState<GridColDef[]>(
    "CommonGrid-cols",
    []
  );
  const [page, setPage] = AVTUseState<number>("CommonGrid-page", 0);
  const [pageSize, setPageSize] = AVTUseState<number>("CommonGrid-pageSize", 5);
  const [loading, setLoading] = AVTUseState<boolean>(
    "CommonGrid-loading",
    false
  );
  const [totalCount, setTotalCount] = AVTUseState<number>(
    "CommonGrid-totalCount",
    0
  );
  const [queryOptions, setQueryOptions] = AVTUseState("queryOptions", {});
  const sortModel = (queryOptions as { sortModel?: GridSortModel })?.sortModel;
  const [quickFilterText, setQuickFilterText] = AVTUseState<string>(
    "CommonGrid-quickFilter",
    ""
  );

  // Load Data from API or passed prop
  const loadData = async () => {
    setLoading(true);

    try {
      let fetchedData: T[] = [];

      if (data && Array.isArray(data)) {
        fetchedData = data;
      } else {
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
        fetchedData = response.Data ?? [];
        setTotalCount(response.TotalCount || 0);
      }

      setRows(fetchedData);

      // Generate columns even if data is empty
      const firstRow = fetchedData[0] || {};
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
                    const confirm = window.confirm("Are you sure to delete?");
                    if (confirm) handleDelete?.(params.row);
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
    } catch (error) {
      console.error("CommonGrid API load error:", error);
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
    } catch (error) {
      console.error("Delete Error:", error);
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
    "CommonGrid-load",
    () => {
      loadData();
    },
    [page, pageSize, reloadTrigger, data, queryOptions, quickFilterText]
  );

  const handleSortModelChange = React.useCallback(
    (sortModel: GridSortModel) => {
      setQueryOptions({ sortModel });
    },
    []
  );

  return (
    <div style={{ height: 500, width: "100%" }} className="relative mb-2">
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
          paginationMode={data ? "client" : "server"}
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={({ page, pageSize }) => {
            setPage(page);
            setPageSize(pageSize);
          }}
          loading={loading}
          pagination
          getRowId={(row) => row.Id ?? row.id}
          processRowUpdate={processRowUpdate}
          showToolbar
          sortingMode="server"
          filterMode="server"
          pageSizeOptions={[5, 10, 20, 50, { value: -1, label: "All" }]}
          onSortModelChange={handleSortModelChange}
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
        />
      </div>
    </div>
  );
}

export default CommonGrid;
