import {
  DataGrid,
  type GridColDef,
  type GridRenderCellParams,
  type GridRowModel,
} from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import { AVTUseEffect, AVTUseState } from "../../customHooks";
import { API } from "../../services/API/api";
import CommonButton from "./CommonButton";

export interface FilterDto {
  PageNo: number;
  PageSize: number;
  Predicates: Record<string, string | number | boolean>;
}

type CommonGridProps<T> = {
  apiUrl: string;
  updateUrl?: string;
  data?: T[]; 
  showEdit?: boolean;
  showDelete?: boolean;
  onEditClick?: (row: T) => void;
  onDeleteClick?: (row: T) => void;
  onAddClick?: () => void;
  reloadTrigger?: number;
};

function CommonGrid<T extends { Id?: number | string; id?: number | string }>(
  {
    apiUrl,
    updateUrl,
    data,
    showEdit = false,
    showDelete = false,
    onEditClick,
    onDeleteClick,
    onAddClick,
    reloadTrigger,
  }: CommonGridProps<T>
) {
  const [rows, setRows] = AVTUseState<T[]>("CommonGrid-rows", []);
  const [columns, setColumns] = AVTUseState<GridColDef[]>("CommonGrid-cols", []);
  const [page, setPage] = AVTUseState<number>("CommonGrid-page", 0);
  const [pageSize, setPageSize] = AVTUseState<number>("CommonGrid-pageSize", 10);
  const [loading, setLoading] = AVTUseState<boolean>("CommonGrid-loading", false);
  const [totalCount, setTotalCount] = AVTUseState<number>("CommonGrid-totalCount", 0);

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
        };

        const response = await API.POST_FULL<T[]>(apiUrl, filter);
        fetchedData = response.Data ?? [];
        setTotalCount(response.TotalCount || 0);
      }

      setRows(fetchedData);

      // Generate columns even if data is empty
      const firstRow = fetchedData[0] || {};
      const generatedColumns: GridColDef[] = Object.keys(firstRow).map((key) => ({
        field: key,
        headerName: key,
        flex: 1,
        editable: true,
      }));

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
                <IconButton onClick={() => onDeleteClick?.(params.row)}>
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

  AVTUseEffect("CommonGrid-load", () => {
    loadData();
  }, [page, pageSize, reloadTrigger, data]);

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
          paginationMode={data ? "client" : "server"} // ✅ client mode if static list is passed
          paginationModel={{ page, pageSize }}
          onPaginationModelChange={({ page, pageSize }) => {
            setPage(page);
            setPageSize(pageSize);
          }}
          loading={loading}
          pagination
          getRowId={(row) => row.Id ?? row.id}
          processRowUpdate={processRowUpdate}
        />
      </div>
    </div>
  );
}

export default CommonGrid;
