package aplikacija;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import baza.FilmDAO;
import baza.KorisnikDAO;
import baza.ProjekcijaDAO;
import model.Film;
import model.Korisnik;
import model.Projekcija;

public class FilmServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String prijavljenKorisnikKorime = (String) request.getSession().getAttribute("prijavljenKorisnik");
		if (prijavljenKorisnikKorime == null) {
			request.getRequestDispatcher("./LogoutServlet").forward(request, response);
			return;
		}
		Korisnik prijavljenKorisnik = KorisnikDAO.getPrijavljen(prijavljenKorisnikKorime);
		if (prijavljenKorisnik == null) {
			request.getRequestDispatcher("./LogoutServlet").forward(request, response);
			return;
		}

		String idFilma = request.getParameter("idFilma");
		
		
		
		Film film = FilmDAO.get(idFilma);
		
		List<Projekcija> projekcije = ProjekcijaDAO.getSve();
		
		Map<String, Object> data = new LinkedHashMap<>();
		data.put("film", film);
		data.put("ulogaPrijavljenogKorisnika", prijavljenKorisnik.getUloga());
		data.put("prijavljenKorisnikKorime", prijavljenKorisnikKorime);
		data.put("projekcije", projekcije);
		
		request.setAttribute("data", data);
		request.getRequestDispatcher("./SuccessServlet").forward(request, response);
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String prijavljenKorisnikKorime = (String) request.getSession().getAttribute("prijavljenKorisnik");
		if (prijavljenKorisnikKorime == null) {
			request.getRequestDispatcher("./LogoutServlet").forward(request, response);
			return;
		}
		Korisnik prijavljenKorisnik = KorisnikDAO.get(prijavljenKorisnikKorime);
		if (prijavljenKorisnik == null) {
			request.getRequestDispatcher("./LogoutServlet").forward(request, response);
			return;
		}
		if (prijavljenKorisnik.getUloga() == null) {
			request.getRequestDispatcher("./UnauthorizedServlet").forward(request, response);
			return;
		}
		
		try {
			String action = request.getParameter("action");
			switch (action) {
				case "izmenaFilma": {
					String naziv = request.getParameter("naziv");
					String reziser = request.getParameter("reziser");
					String glumci = request.getParameter("glumci");
					String zanrovi = request.getParameter("zanrovi");
					String trajanje = request.getParameter("trajanje");
					String distributer = request.getParameter("distributer");
					String zemljaPorekla = request.getParameter("zemljaPorekla");
					String godinaProizvodnje = request.getParameter("godinaProizvodnje");
					String opis = request.getParameter("opis");
					
					String idFilma = request.getParameter("idFilma");
					Film film = FilmDAO.get(idFilma);
					
					film.setNaziv(naziv);
					film.setReziser(reziser);
					film.setGlumci(glumci);
					film.setZanrovi(zanrovi);
					film.setTrajanje(trajanje);
					film.setDistributer(distributer);
					film.setZemljaPorekla(zemljaPorekla);
					film.setGodinaProizvodnje(godinaProizvodnje);
					film.setOpis(opis);
					
					if(idFilma == null) {
						request.getRequestDispatcher("./FailServlet").forward(request, response);
						return;
					}
					FilmDAO.izmenaFilma(film);
					break;
				}
				case "delete":{
					String idFilma = request.getParameter("idFilma");
					if(!FilmDAO.logickoBrisanjeFilma(idFilma)) {
						FilmDAO.brisanjeFilma(idFilma);
					}
					
					break;
				}
			}
			
			request.getRequestDispatcher("./SuccessServlet").forward(request, response);
		} catch (Exception ex) {
			ex.printStackTrace();
			request.getRequestDispatcher("./FailServlet").forward(request, response);
		}
		
	}

}
