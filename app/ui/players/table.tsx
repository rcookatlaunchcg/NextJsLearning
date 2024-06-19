import { UpdatePlayer, DeletePlayer } from '@/app/ui/players/buttons';
import { fetchFilteredPlayers } from '@/app/lib/players/data'
import { PlayerTable } from '@/app/lib/definitions';
import { formatDateToLocal } from '@/app/lib/utils';

export default async function PlayersTable({
  query,
  currentPage,
}: {
  query: string;
  currentPage: number;
}) {
  const players = await fetchFilteredPlayers(query, currentPage);

  return (
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 p-2 md:pt-0">
          <div className="md:hidden">
            {players?.map((player: PlayerTable) => (
              <div
                key={player.id}
                className="mb-2 w-full rounded-md bg-white p-4"
              >
                <div className="flex items-center justify-between border-b pb-4">
                  <div>
                    <div className="mb-2 flex items-center">
                      <div className="grid grid-cols-2 gap 6">
                        <p>{player.user_name}</p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500">{formatDateToLocal(player.created_date)}</p>
                  </div>
                  <p className="text-sm text-gray-500">{player.email}</p>
                </div>
                <div className="flex w-full items-center justify-between pt-4">
                  <div />
                  <div className="flex justify-end gap-2">
                    <UpdatePlayer id={player.id} />
                    <DeletePlayer id={player.id} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <table className="hidden min-w-full text-gray-900 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium sm:pl-6">
                  User Name
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Email
                </th>
                <th scope="col" className="px-3 py-5 font-medium">
                  Created Date
                </th>
                <th scope="col" className="relative py-3 pl-6 pr-3">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {players?.map((player: PlayerTable) => (
                <tr
                  key={player.id}
                  className="w-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg"
                >
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex items-center gap-3">
                      <p>{player.user_name}</p>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{player.email}</p>
                  </td>
                  <td className="whitespace-nowrap px-3 py-3">
                    <p>{formatDateToLocal(player.created_date)}</p>
                  </td>
                  <td className="whitespace-nowrap py-3 pl-6 pr-3">
                    <div className="flex justify-end gap-3">
                      <UpdatePlayer id={player.id} />
                      <DeletePlayer id={player.id} />
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