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
import baza.KartaDAO;
import baza.KorisnikDAO;
import baza.ProjekcijaDAO;
import model.Film;
import model.Karta;
import model.Korisnik;
import model.Projekcija;
import model.TipKorisnika;

public class NalogServlet extends HttpServlet {
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

		String korime = request.getParameter("korime");
		
		if(prijavljenKorisnik.getUloga().name().equals("KORISNIK") && !(prijavljenKorisnik.getKorime().equals(korime))) {
			request.getRequestDispatcher("./LogoutServlet").forward(request, response);
			return;
		}

		Korisnik korisnik = KorisnikDAO.get(korime);
		
		List<Karta> karte = KartaDAO.karteKorisnika(korime);
		
		List<Projekcija> projekcije = ProjekcijaDAO.getSve();
		
		List<Film> filmovi = FilmDAO.getAll();
		
		Map<String, Object> data = new LinkedHashMap<>();
		data.put("korisnik", korisnik);
		data.put("ulogaPrijavljenogKorisnika", prijavljenKorisnik.getUloga());
		data.put("prijavljenKorisnik", prijavljenKorisnik);
		data.put("karteKorisnika", karte);
		data.put("projekcije", projekcije);
		data.put("filmovi", filmovi);
		
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
		
		List<Korisnik> korisnici = KorisnikDAO.getAll();
		
		Map<String, Object> data = new LinkedHashMap<>();
		data.put("korisnici", korisnici);	
		
		try {
			String action = request.getParameter("action");
			switch (action) {
				case "izmenaKorisnika": {		
					String lozinkaKorisnik = request.getParameter("lozinkaKorisnik");
					
					String korimeKorisnik = request.getParameter("korimeKorisnik");
					
					String uloga = request.getParameter("uloga");	
					
					Korisnik korisnik = KorisnikDAO.get(korimeKorisnik);

					korisnik.setLozinka(lozinkaKorisnik);
					korisnik.setUloga(TipKorisnika.valueOf(uloga));
					
					if(korimeKorisnik == null) {
						request.getRequestDispatcher("./FailServlet").forward(request, response);
						return;
					}
					KorisnikDAO.izmenaKorisnika(korisnik);
					break;
				}
				case "izmenaKorisnikaAdmin": {
					String lozinka = request.getParameter("lozinka");
					String uloga = request.getParameter("uloga");	
					
					String korimeKorisnik = request.getParameter("korimeKorisnik");
					Korisnik korisnik = KorisnikDAO.get(korimeKorisnik);
					
					korisnik.setLozinka(lozinka);
					korisnik.setUloga(TipKorisnika.valueOf(uloga));
					
					if(korimeKorisnik == null) {
						request.getRequestDispatcher("./FailServlet").forward(request, response);
						return;
					}
					KorisnikDAO.izmenaKorisnika(korisnik);
					break;
				}
				case "delete":{
					String korime = request.getParameter("korime");
					if(!KorisnikDAO.logickoBrisanjeKorisnika(korime)) {
						KorisnikDAO.brisanjeKorisnika(korime);
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
