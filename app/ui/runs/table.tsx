import { UpdateRun, DeleteRun } from '@/app/ui/runs/buttons';
import { fetchFilteredRuns } from '@/app/lib/runs/data';
import { RunTable } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';
import Link from 'next/link';

export default async function RunsTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const runs = await fetchFilteredRuns(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {runs?.map((run: RunTable) => (
              <div
                key={run.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <div className="grid grid-cols-2 gap 6">
                        <Link
                          href={`/dashboard/players/${run.player_id}/view`}
                          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                        >
                          {run.player_name}
                        </Link>
                      </div>
                    </div>
                    <Link
                      href={`/dashboard/games/${run.game_id}/view`}
                      className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    >
                      {run.game_name}
                    </Link>
                  </div>
                  <div>
                    <div className="mb-2 flex items-center">
                      <div className="grid grid-cols-2 gap 6">
                        <Link
                          href={`/dashboard/runs/${run.id}/view`}
                          className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                        >
                          {run.duration}
                        </Link>
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-500">{formatDateToLocal(run.run_date)}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <Link
                    href={run.video_link}
                    className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                  >
                    {run.video_link}
                  </Link>
                  <div className="flex justify-end gap-2">
                    <UpdateRun id={run.id} />
                    <DeleteRun id={run.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  Player Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Game Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Run Duration
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Link
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Run Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {runs?.map((run: RunTable) => (
                <tr
                  key={run.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <Link
                        href={`/dashboard/players/${run.player_id}/view`}
                        className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                      >
                        {run.player_name}
                      </Link>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Link
                      href={`/dashboard/games/${run.game_id}/view`}
                      className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    >
                      {run.game_name}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Link
                      href={`/dashboard/runs/${run.id}/view`}
                      className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    >
                      {run.duration}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <Link
                      href={run.video_link}
                      className="underline text-blue-600 hover:text-blue-800 visited:text-purple-600"
                    >
                      {run.video_link}
                    </Link>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{formatDateToLocal(run.run_date)}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdateRun id={run.id} />
                      <DeleteRun id={run.id} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
