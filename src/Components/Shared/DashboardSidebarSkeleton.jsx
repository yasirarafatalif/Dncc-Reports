const SidebarItemSkeleton = () => (
  <div className="flex items-center gap-3 px-4 py-3 animate-pulse">
    <div className="w-5 h-5 bg-base-300 rounded"></div>
    <div className="h-4 w-24 bg-base-300 rounded is-drawer-close:hidden"></div>
  </div>
);

const DashboardSidebarSkeleton = () => {
  return (
    <div className="flex min-h-full flex-col bg-base-200 is-drawer-close:w-14 is-drawer-open:w-64">
      <ul className="menu w-full grow gap-1 mt-2">
        {[...Array(8)].map((_, i) => (
          <SidebarItemSkeleton key={i} />
        ))}
      </ul>
    </div>
  );
};

export default DashboardSidebarSkeleton;
