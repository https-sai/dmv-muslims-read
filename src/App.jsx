import { motion } from "motion/react";
import {
  BookOpen,
  Calendar,
  CalendarCheck,
  Camera,
  ClipboardList,
  ExternalLink as ExternalLinkIcon,
  Phone,
  Ticket,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { onExternalLinkClick } from "@/lib/open-link";
import { cn } from "@/lib/utils";

import "./App.css";

const links = {
  notion:
    "https://sahmed21.notion.site/dmv-muslims-read-36b2d237a82280b5a31bd114a1d3bd59",
  interestForm:
    "https://sahmed21.notion.site/36c2d237a82280a5a4c4e4ff31590950?pvs=105",
  whatsapp: "https://chat.whatsapp.com/FeN846wxAPUHPH3BnNkVDu",
  instagram: "https://www.instagram.com/dmvmuslimsread",
  googleMeet: "https://meet.google.com/cgd-cyhq-rve",
  googleMaps:
    "https://www.google.com/maps?ll=39.285597,-76.808618&z=15&t=m&hl=en-US&gl=US&mapclient=embed&cid=8189539222596840137",
  addCalendar: "https://calendar.app.google/peWTx1MQ1VACR94P7",
  bookSuggestions:
    "https://sahmed21.notion.site/37b2d237a82280c4ad70dc934d2aa4d0?pvs=105",
  rsvp: "https://sahmed21.notion.site/37b2d237a822807c8fd8ce55f43d5732?pvs=105",
  goodreads: "https://www.goodreads.com/book/show/254523",
  pdf: "https://www.emaanlibrary.com/wp-content/uploads/2019/10/letter-to-a-disciple-english.pdf",
};
const BOOK_COVER_SRC = `${import.meta.env.BASE_URL}book-cover.png`;

const discussionRows = [
  ["summary + presentation", "~5 min"],
  ["group prompts", "~30 min"],
  ["open floor for Qs + comments", "~30 min"],
  ["subgroup prompts", "~30 min"],
  [
    "closing comments + decide next month's reading + discussion leader",
    "~30 min",
  ],
];

const discussionNotes = [
  {
    label: "prompts",
    content: (
      <p className="m-0 pl-[13px] text-[13px] leading-relaxed text-white">
        Everyone submits a question/topic for discussion at least{" "}
        <strong className="highlight">3 days prior</strong> to meeting (new form
        for submissions will be created on notion page prior to meetings)
      </p>
    ),
  },
  {
    label: "discussion leader",
    content: (
      <ul className="m-0 list-disc pl-[26px] text-[13px] leading-[1.7] text-white">
        <li>
          Gives <strong className="highlight">5 min</strong> presentation +
          summary of reading → use visuals, reference quotes, touch on the most
          important/notable concepts that spoke to you
        </li>
        <li>
          Leads <strong className="highlight">group discussion</strong>,
          maintains time, engages everyone, keeps conversation on topic
        </li>
      </ul>
    ),
  },
  {
    label: "subgroups",
    content: (
      <ul className="m-0 list-disc pl-[26px] text-[13px] leading-[1.7] text-white">
        <li>
          Break off into groups of <strong className="highlight">3–5</strong>{" "}
          people
        </li>
        <li>
          Some prompts will be used for smaller group discussion segments to
          allow people to break off and participate with less pressure
        </li>
      </ul>
    ),
  },
];

function ExternalLink({ href, className, children }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => onExternalLinkClick(event, href)}
      className={cn("link-hover font-medium text-blue underline", className)}
    >
      {children}
    </a>
  );
}

function LinkButton({
  href,
  variant = "yellow",
  icon: Icon,
  iconClassName,
  children,
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(event) => onExternalLinkClick(event, href)}
      className={buttonVariants({ variant })}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      whileTap={{ scale: 0.99 }}
    >
      {Icon ? <Icon className={cn(iconClassName)} /> : null}
      {children}
    </motion.a>
  );
}

function BookCover() {
  return (
    <motion.div
      className="book-cover"
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.55, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -2, transition: { duration: 0.25 } }}
    >
      <img
        src={BOOK_COVER_SRC}
        alt="Al-Ghazali: Letter to a Disciple (Ayyuhā'l-Walad)"
        className="book-cover-img"
      />
    </motion.div>
  );
}

export default function App() {
  return (
    <div className="page-shell bg-bg font-body text-white">
      <motion.div
        className="page-container box-border w-full max-w-4xl px-5 pt-8 pb-14 sm:px-7 sm:pt-10 sm:pb-16 md:px-8 md:pt-12 md:pb-[4.5rem]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="page-sections flex w-full flex-col gap-4 sm:gap-5 md:gap-6">
          <div className="grid-hero grid w-full grid-cols-1 gap-4 min-[541px]:grid-cols-[1.75fr_1fr]">
            <Card delay={0} className="flex h-full min-w-0 flex-col gap-3">
              <CardHeader className="gap-3 p-0">
                <div>
                  <CardTitle className="mb-[5px] text-2xl leading-tight">
                    <Badge variant="yellow">DMV Muslims Read</Badge>{" "}
                    <span className="text-base font-medium text-white">
                      (DMR)
                    </span>
                  </CardTitle>
                  <CardDescription>
                    <span className="highlight font-semibold">Open to All</span>{" "}
                    — Monthly Book Club
                  </CardDescription>
                </div>
              </CardHeader>
              <CardFooter className="p-0">
                <LinkButton
                  href={links.interestForm}
                  icon={ClipboardList}
                  iconClassName="text-white"
                >
                  Interest Form
                </LinkButton>
              </CardFooter>
            </Card>

            <Card delay={0.08} className="flex h-full min-w-0 flex-col gap-3">
              <CardHeader className="gap-3 p-0">
                <CardTitle className="text-[17px]">
                  <Badge variant="yellow">connect</Badge>
                  <span className="text-white">:</span>
                </CardTitle>
              </CardHeader>
              <CardFooter className="flex-col items-start gap-[7px] p-0">
                <LinkButton
                  href={links.whatsapp}
                  variant="outline"
                  icon={Phone}
                  iconClassName="text-green-500"
                >
                  WhatsApp
                </LinkButton>
                <LinkButton
                  href={links.instagram}
                  variant="outline"
                  icon={Camera}
                  iconClassName="text-pink-500"
                >
                  Instagram
                </LinkButton>
              </CardFooter>
            </Card>
          </div>

          <div className="grid-meeting grid w-full grid-cols-1 gap-4 min-[541px]:grid-cols-[auto_minmax(0,1fr)]">
            <BookCover />

            <Card
              delay={0.12}
              className="flex h-full min-w-0 flex-col gap-[11px]"
            >
              <CardHeader className="flex-row items-center gap-2 p-0">
                <Calendar
                  className="size-[15px] stroke-white"
                  strokeWidth={2}
                />
                <CardTitle className="text-[15px]">
                  <Badge variant="yellow">MEETING #1</Badge>
                </CardTitle>
              </CardHeader>

              <Separator />

              <CardContent className="flex flex-col gap-[5px] p-0 text-[13px]">
                <div>
                  Saturday,{" "}
                  <Badge variant="yellow" asChild>
                    <strong>August 22</strong>
                  </Badge>{" "}
                  · 6:00 – 9:00pm
                </div>
                <div>
                  @{" "}
                  <Badge variant="yellow" asChild>
                    <strong>Cube Coffee</strong>
                  </Badge>
                  :{" "}
                  <ExternalLink href={links.googleMaps}>
                    Google Maps
                  </ExternalLink>
                </div>
                <div>
                  @{" "}
                  <Badge variant="yellow" asChild>
                    <strong>Google Meet</strong>
                  </Badge>
                  :{" "}
                  <ExternalLink href={links.googleMeet}>Join Meet</ExternalLink>
                </div>
              </CardContent>

              <LinkButton
                href={links.addCalendar}
                icon={CalendarCheck}
                iconClassName="text-white"
              >
                add to calendar
              </LinkButton>

              <Separator />

              <CardContent className="flex flex-col gap-[5px] p-0 text-[13px]">
                <div>
                  <Badge variant="yellow">book</Badge>:{" "}
                  <ExternalLink href={links.goodreads}>
                    Al-Ghazali&apos;s <em>Letter to a Disciple</em>
                  </ExternalLink>
                </div>
                <div>
                  free <Badge variant="yellow">pdf</Badge>:{" "}
                  <ExternalLink href={links.pdf}>emaanlibrary.com</ExternalLink>
                </div>
                <div>
                  <Badge variant="yellow">rsvp</Badge>: submit a discussion
                  question
                </div>
              </CardContent>

              <CardFooter className="flex-wrap gap-[7px] p-0">
                <LinkButton
                  href={links.rsvp}
                  icon={Ticket}
                  iconClassName="text-white"
                >
                  RSVP
                </LinkButton>
                <LinkButton
                  href={links.bookSuggestions}
                  variant="outline"
                  icon={BookOpen}
                  iconClassName="text-white"
                >
                  book suggestions
                </LinkButton>
              </CardFooter>
            </Card>
          </div>

          <Card delay={0.18}>
            <CardHeader className="mb-3.5 p-0">
              <CardTitle className="text-base">
                <Badge variant="yellow">discussion structure</Badge>
                <span className="ml-2.5 font-mono text-[11px] font-normal text-white">
                  (hypothetical 2 hr session)
                </span>
              </CardTitle>
            </CardHeader>

            <Table>
              <TableBody>
                {discussionRows.map(([activity, time], index) => (
                  <TableRow key={activity} index={index}>
                    <TableCell>{activity}</TableCell>
                    <TableCell className="text-right font-mono text-[11px] font-medium whitespace-nowrap">
                      <span className="highlight">{time}</span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <CardContent className="flex flex-col gap-3.5 p-0">
              {discussionNotes.map(({ label, content }) => (
                <div key={label}>
                  <Badge variant="note" className="mb-[5px]">
                    <span className="size-[5px] rounded-full bg-yellow/50" />
                    {label}
                  </Badge>
                  {content}
                </div>
              ))}
            </CardContent>
          </Card>

          <motion.footer
            className="page-footer mt-2 flex w-full flex-col gap-4 border-t border-white pt-5 sm:flex-row sm:items-center sm:justify-between"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.25, ease: "easeOut" }}
          >
            <p className="font-mono text-[11px] leading-relaxed tracking-wider text-white uppercase">
              DMV Muslims Read · site by{" "}
              <a
                href="https://https-sai.com/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) =>
                  onExternalLinkClick(event, "https://https-sai.com/")
                }
                className="link-hover underline underline-offset-2"
              >
                https-sai
              </a>{" "}
              · built with{" "}
              <a
                href="https://blox-ui-five.vercel.app/#install"
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) =>
                  onExternalLinkClick(
                    event,
                    "https://blox-ui-five.vercel.app/#install",
                  )
                }
                className="link-hover underline underline-offset-2"
              >
                blox-ui
              </a>
            </p>
            <LinkButton
              href={links.notion}
              variant="outline"
              icon={ExternalLinkIcon}
              iconClassName="text-white"
            >
              View on Notion
            </LinkButton>
          </motion.footer>
        </div>
      </motion.div>
    </div>
  );
}
